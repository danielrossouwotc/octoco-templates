import { env } from 'src/env';

/**
 * Configuration object for Cognito.
 */
const cognitoConfig: Record<string, any> = {
    poolData: {
        UserPoolId: env.REACT_APP_APP_COGNITO_USERPOOL_ID,
        ClientId: env.REACT_APP_APP_COGNITO_CLIENT_ID,
    }
};
export default cognitoConfig;