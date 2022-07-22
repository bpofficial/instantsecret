import amplifyConfig from './aws-exports';

export const config = { ...amplifyConfig, ssr: true, Auth: {} };
