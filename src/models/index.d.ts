import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type SecretMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Secret {
  readonly id: string;
  readonly userID: string;
  readonly key?: string | null;
  readonly value?: string | null;
  readonly state?: string | null;
  readonly originalSize?: number | null;
  readonly size?: number | null;
  readonly passphrase?: string | null;
  readonly pairedKey?: string | null;
  readonly metadataKey?: string | null;
  readonly secretKey?: string | null;
  readonly encyptedValue?: string | null;
  readonly valueEncryptionVersion?: number | null;
  readonly passphraseEncryptionVersion?: number | null;
  readonly entropy?: string | null;
  readonly viewed?: number | null;
  readonly shared?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Secret, SecretMetaData>);
  static copyOf(source: Secret, mutator: (draft: MutableModel<Secret, SecretMetaData>) => MutableModel<Secret, SecretMetaData> | void): Secret;
}

export declare class User {
  readonly id: string;
  readonly auth0UserId?: string | null;
  readonly auth0OrgId?: string | null;
  readonly secrets?: (Secret | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}