import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type LinkModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class LinkModel {
  readonly id: string;
  readonly key?: string | null;
  readonly value?: string | null;
  readonly creatorUserID?: string | null;
  readonly recipients?: string | null;
  readonly views?: string | null;
  readonly burnt?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<LinkModel, LinkModelMetaData>);
  static copyOf(source: LinkModel, mutator: (draft: MutableModel<LinkModel, LinkModelMetaData>) => MutableModel<LinkModel, LinkModelMetaData> | void): LinkModel;
}