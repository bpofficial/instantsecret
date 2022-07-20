// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { LinkModel } = initSchema(schema);

export {
  LinkModel
};