
/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const AWS = require('aws-sdk')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express');
const { customAlphabet } = require('nanoid');
const jwt = require('jsonwebtoken');
const { RedshiftServerless } = require('aws-sdk');

const generateKey = customAlphabet(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  32
);

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let env = 'default'
let tableName = "LinkModel-q4ld7jvbnrfghia3mhjcsszwuq";
if (process.env.ENV && process.env.ENV !== "NONE") {
    env = process.env.ENV;
  tableName = tableName + '-' + process.env.ENV;
}

const path = "/links";

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "OPTIONS,POST,DELETE")
  next()
});

/************************************
* HTTP options method for cors       *
*************************************/

app.options(path, function(req, res) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "OPTIONS,POST,DELETE")
    res.send();
})

/************************************
* HTTP post method for insert object *
*************************************/

app.post(path, async function(req, res) {
    // get user id
    let creatorUserID = null;
    const rawToken = req.headers['authorization'];
    if (rawToken) {
        const token = jwt.decode(rawToken.slice(7));
        creatorUserID = token.sub;
    }

  if (!req.body || !req.body.value) {
    res.statusCode = 400
    res.json({
        code: 400,
        error: 'Bad Request',
        description: `Expected body to not be empty. Missing required 'value' property.`
    })
    return;
  }

  const id = generateKey();
  const secretId = generateKey();
  const secretKey = generateKey();

  const result = await dynamodb.put({
    TableName: tableName,
    Item: {
        id, // linkId
        secretId, // secretId
        secretKey,
        creatorUserID,
        recipients: req.body.recipients || [],
        passphrase: req.body.passphrase || null,
        ttl: req.body.ttl || 1000 * 60 * 60 * 24 * 7, // 7 days default,
        internal: req.body.internal === true
    },
    ConditionExpression: 'attribute_not_exists(id)'
  }).promise()

  if (result.$response.error) {
    res.statusCode = result.$response.httpResponse.statusCode;
    res.json({
        code: result.$response.httpResponse.statusCode,
        error: 'Internal Server Error',
        description: 'Failed to create link.'
    })
  }

  // Using overwrite: true to enforce that someone trying to recreate a dummy secret with the same key doesn't get the original secret.
  const secret = await (new AWS.SecretsManager()).createSecret({ Name: `/secrets/${env}/${secretId}`, SecretString: req.body.value, ForceOverwriteReplicaSecret: false }).promise();
  if (secret.$response.error) {
    res.statusCode = result.$response.httpResponse.statusCode;
    res.json({
        code: result.$response.httpResponse.statusCode,
        error: 'Internal Server Error',
        description: 'Failed to create link.'
    })
    return;
  }

  res.statusCode = 201;
  res.json({
    linkId: id
  })
});

/*************************************
* HTTP delete method to remove object *
**************************************/

app.delete(path + '/:linkId', async function(req, res) {
    const id = req.params['linkId'];

    if (!id) {
        res.statusCode = 404;
        res.send();
        return;
    }

    const record = await dynamodb.get({
        TableName: tableName,
        Key: {
            id,
        }
    }).promise()

    if (!record || !record.Item || record.Item.burntAt) {
        res.statusCode = 404;
        res.send();
        return;
    }

    const result = await (new AWS.SecretsManager()).deleteSecret({ SecretId: `/secrets/${env}/${record.Item.secretId}` }).promise();

    if (result.$response.error) {
        res.statusCode = 404;
        res.send();
        return;
    }

    const update = await dynamodb.update({
        TableName: tableName,
        Key: {
            id
        },
        UpdateExpression: 'SET burntAt = :burntAt',
        ExpressionAttributeValues: { ':burntAt': new Date().toISOString() }
    }).promise();

    if (update.$response.error) {
        res.statusCode = 404;
        res.send();
        return;
    }

    res.statusCode = 204;
    res.send();
})

/*************************************
* HTTP get method to retrieve object  *
**************************************/

app.get(path + '/:linkId', async function(req, res) {
    const id = decodeURIComponent(req.params['linkId'].toString());
    const viewedByCreator = req.query['creator'] === 'true';
    const viewedByRecipient = req.query['recipient'] === 'true';
    const passphrase = req.body['passphrase'] || null;

    if (!id) {
        res.statusCode = 404;
        res.send();
        return;
    }

    let record;
    if (viewedByCreator) {
        record = await dynamodb.get({
            TableName: tableName,
            Key: {
                id,
            }
          }).promise()
    } else {
        // Need to scan since we're not using a primary key :sigh:
        // deepcode ignore NoSqli: ?
        record = await dynamodb.scan({
            TableName: tableName,
            FilterExpression: 'secretKey = :secretKey',
            ExpressionAttributeValues: { ':secretKey': id }
          }).promise()

        if (record.$response.error || record.Count === 0) {
            res.statusCode = 404;
            res.send();
            return;
        }

        if (record.Count > 1) {
            console.log('More than 1 secret found with id', id);
            res.statusCode = 404;
            res.send();
            return;
        }

        record = { Item: record.Items[0] }
    }

    if (!record || !record.Item || (record.Item.burntAt && !viewedByCreator)) {
        res.statusCode = 404;
        res.send();
        return;
    }

    let canViewSecretValue = false;
    if ((viewedByCreator && !record.Item.viewedByCreatorAt) || (viewedByRecipient && !record.Item.viewedByRecipientAt)) {
        canViewSecretValue = true;
        try {
            const update = await dynamodb.update({
                TableName: tableName,
                Key: {
                    id: record.Item.id
                },
                UpdateExpression: 'SET #viewTimeProp = :viewedAt',
                ExpressionAttributeValues: { ':viewedAt': new Date().toISOString() },
                ExpressionAttributeNames: { '#viewTimeProp': viewedByCreator ? 'viewedByCreatorAt' : 'viewedByRecipientAt' }
            }).promise();
            if (update.$response.error) {
                console.log(update.$response);
                res.statusCode = 500
                res.json()
                return;
            }
        } catch (err) {
            console.log(err);
            res.statusCode = 500
            res.json()
            return;
        }
    }

    let secret;
    try {
        if (canViewSecretValue) {
            secret = await (new AWS.SecretsManager()).getSecretValue({ SecretId: `/secrets/${env}/${record.Item.secretId}` }).promise();
        }
    } catch (err) {
        console.log(err);
        res.statusCode = 500
        res.json()
        return;
    }

    if (secret && secret.$response.error) {
        res.statusCode = 404;
        res.send();
        return;
    }

    res.statusCode = 200;
    res.json({
        secretKey: record.Item.secretKey,
        value: secret ? secret.SecretString : null,
        ttl: record.Item.ttl,
        encrypted: !!record.Item.passphrase,
        burntAt: record.Item.burntAt,
        createdAt: record.Item.createdAt,
        viewedByCreatorAt: record.Item.viewedByCreatorAt,
        viewedByRecipientAt: record.Item.viewedByRecipientAt,
    })
})

app.listen(3000, function() {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
