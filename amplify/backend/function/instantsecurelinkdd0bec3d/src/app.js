
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

const generateKey = customAlphabet(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  32
);

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "LinkModel-q4ld7jvbnrfghia3mhjcsszwuq";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const path = "/links/:linkId";

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

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

  const key = generateKey();

  const result = await dynamodb.putItem({
    TableName: tableName,
    Item: {
        key,
        views: 0,
        burnt: false,
        creatorUserID,
        recipients: req.body.recipients || [],
        passphrase: req.body.passphrase || null,
        ttl: req.body.ttl || 1000 * 60 * 60 * 24 * 7, // 7 days default
        createdAt: new Date().toISOString()
    },
    ConditionExpression: 'attribute_not_exists(key)'
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
  const secret = await (new AWS.SSM()).putParameter({ Name: `${result.Attributes['id']}-${key}`, Value: req.body.value, Type: "SecureString", Overwrite: true }).promise();

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
    res.json({ key })
});

app.listen(3000, function() {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
