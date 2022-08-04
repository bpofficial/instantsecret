import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type LinkModelMetaData = {
    readOnlyFields: "createdAt" | "updatedAt";
};

export declare class LinkModel {
    readonly id: string;
    readonly secretId?: string | null;
    readonly secretKey?: string | null;
    readonly creatorUserID?: string | null;
    readonly recipients?: (string | null)[] | null;
    readonly views?: number | null;
    readonly burnt?: boolean | null;
    readonly ttl?: number | null;
    readonly passphrase?: string | null;
    readonly internal?: boolean | null;
    readonly createdAt?: string | null;
    readonly updatedAt?: string | null;
    constructor(init: ModelInit<LinkModel, LinkModelMetaData>);
    static copyOf(
        source: LinkModel,
        mutator: (
            draft: MutableModel<LinkModel, LinkModelMetaData>
        ) => MutableModel<LinkModel, LinkModelMetaData> | void
    ): LinkModel;
}
