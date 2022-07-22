import amplifyConfig from './aws-exports';

export const config = {
    ...amplifyConfig,
    ssr: true,
    API: {
        endpoints: amplifyConfig.aws_cloud_logic_custom ?? []
    }
};
