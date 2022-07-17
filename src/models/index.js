// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Secret, User } = initSchema(schema);

export {
  Secret,
  User
};