import {
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    GetStaticPropsContext,
    GetStaticPropsResult,
} from "next";
import { getDynamodb } from "../aws";

const fetchCounter = async (): Promise<number> => {
    const { dynamodb, tableName } = getDynamodb();
    const result = await dynamodb
        .scan({
            TableName: tableName,
            Select: "COUNT",
        })
        .promise();
    return result.Count ?? 0;
};

type WithCounterPropsInnerFn =
    | ((
          ctx: GetStaticPropsContext
      ) => Promise<GetStaticPropsResult<any>> | GetStaticPropsResult<any>)
    | ((
          ctx: GetServerSidePropsContext
      ) => Promise<GetServerSidePropsResult<any>>)
    | GetStaticPropsResult<any>;

export const withCounterProps =
    (fn: WithCounterPropsInnerFn = { props: {} }) =>
    async (ctx: GetStaticPropsContext | GetServerSidePropsContext) => {
        let result;
        if (typeof fn === "function") {
            result = await fn(ctx as any);
        } else {
            result = fn;
        }
        if ("props" in result) {
            const counter = await fetchCounter();
            result.props.__COUNTER = counter;
        }
        return result;
    };
