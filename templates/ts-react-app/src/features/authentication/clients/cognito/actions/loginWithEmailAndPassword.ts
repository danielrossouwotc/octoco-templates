import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { _getCognitoUser } from './_getCognitoUser';

const asyncAuthenticateUser = (
    cognitoUser: CognitoUser,
    cognitoAuthenticationDetails: AuthenticationDetails
) => {
    return new Promise<any>(function (resolve, reject) {
        cognitoUser.authenticateUser(cognitoAuthenticationDetails, {
            onSuccess: resolve,
            onFailure: reject,
        });
    });
}

/**
 * Logs in a user with the provided email and password using Cognito authentication.
 * 
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns An object containing the user information, authentication status, access token, refresh token, and error (if any).
 * @throws An error if there is an issue with the login process.
 */
export const loginWithEmailAndPasswordCognito = async (email: string, password: string) => {
    try {
        const authenticationData = {
            Username: email,
            Password: password,
        }

        const authenticationDetails = new AuthenticationDetails(authenticationData)
        const cognitoUser = _getCognitoUser(email)
        cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');
        const res: any = await asyncAuthenticateUser(cognitoUser, authenticationDetails);

        return {
            user: res.idToken.payload,
            status: 'authenticated',
            accessToken: res.accessToken.jwtToken,
            refreshToken: res.refreshToken.token,
            error: null,
        };
    } catch (error: any) {
        throw new Error('er');
    }
}