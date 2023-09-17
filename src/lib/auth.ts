import type {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
import TwitterProvider from "next-auth/providers/twitter"
import {FirestoreAdapter} from "@auth/firebase-adapter";
import {OAuth2Client} from "google-auth-library";
import {firestore} from "@/lib/firestore";
import {type TokenSet} from "@auth/core/types"
import {type AdapterAccount} from "@auth/core/adapters";

//  This is an instance of a Google client that we need to ask google information about the user
const googleAuthClient = new OAuth2Client(process.env.GOOGLE_ID);

const adapter = FirestoreAdapter({namingStrategy: "snake_case"});

const GOOGLE_AUTHORIZATION_URL =
    'https://accounts.google.com/o/oauth2/v2/auth?' +
    new URLSearchParams({
        prompt: 'consent',
        access_type: 'offline',
        response_type: 'code'
    })

/**
 * Takes a token and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
// @ts-ignore
async function refreshAccessToken(token) {
    try {
        const url =
            'https://oauth2.googleapis.com/token?' +
            new URLSearchParams({
                client_id: process.env.GOOGLE_ID,
                client_secret: process.env.GOOGLE_SECRET,
                grant_type: 'refresh_token',
                refresh_token: token.refresh_token
            })

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST'
        })

        const refreshedTokens: TokenSet = await response.json()

        if (!response.ok) throw refreshedTokens

        return {
            ...token,
            access_token: refreshedTokens.access_token,
            expires_at: Date.now() + refreshedTokens.expires_at! * 1000,
            refresh_token: refreshedTokens.refresh_token ?? token.refresh_token // Fall back to old refresh token
        }
    } catch (error) {
        console.error("Error refreshing access token", error)
        // The error property will be used client-side to handle the refresh token error
        return {...token, error: "RefreshAccessTokenError" as const}
    }
}

const getUserAccountByProvider = async (provider: string, userId: string) => {
    const accounts = await firestore
        .collection("accounts")
        .where("provider", "==", provider)
        .where("userId", "==", userId)
        // .where("provider_account_id", "==", provider_account_id)
        .limit(1)
        .get();

    const doc = accounts.docs[0];

    return {account: doc.data() as AdapterAccount, id: doc.id};
}

export const authOptions: NextAuthOptions = {
// @ts-ignore
    adapter,
    callbacks: {
        session: async ({session, token, user}) => {
            // const {account, id} = await getUserAccountByProvider('google', user?.id!);
            // if (account.expires_at && account.expires_at < Date.now()) {
            //     try {
            //         const refreshedTokens = await refreshAccessToken(account.refresh_token!);
            //         await firestore
            //             .collection("accounts")
            //             .doc(id)
            //             .update({
            //                 access_token: refreshedTokens.access_token,
            //                 expires_at: refreshedTokens.expires_at,
            //                 refresh_token: refreshedTokens.refresh_token,
            //             });
            //     } catch (e) {
            //         console.error("Error refreshing access token", e)
            //         // The error property will be used client-side to handle the refresh token error
            //         session.error = "RefreshAccessTokenError"
            //     }
            // }
            // return session;
            session.user = token.user
            session.access_token = token.access_token
            session.error = token.error

            return session
        },
        jwt: async ({token, user, account}) => {
            // Initial sign in
            if (account && user) {
                return {
                    access_token: account.access_token,
                    expires_at: Date.now() + account.expires_at! * 1000,
                    refresh_token: account.refresh_token,
                    provider: account.provider,
                    user,
                }
            }
            // Return the previous token if the access token has not expired yet
            if (Date.now() < token.expires_at) {
                return token
            }

            // Access token has expired, try to update it
            return refreshAccessToken(token)
        },
    },
    providers: [
        CredentialsProvider({
            // We will use this id later to specify for what Provider we want to trigger the signIn method
            id: process.env.CREDENTIALS_ID,
            name: process.env.CREDENTIALS_NAME,

            // This means that the authentication will be done through a single credential called 'credential'
            credentials: {
                credential: {type: "text"},
            },

            // This function will be called upon signIn
            async authorize(credentials, req) {
                const token = credentials!.credential;
                const ticket = await googleAuthClient.verifyIdToken({
                    idToken: token,
                    audience: process.env.GOOGLE_ID,
                });

                const payload = ticket.getPayload();
                if (!payload) {
                    throw new Error("Cannot extract payload from sign in token");
                }

                const {
                    email,
                    sub,
                    given_name,
                    family_name,
                    email_verified,
                    picture: image,
                    at_hash,
                    exp,
                } = payload;
                if (!email) {
                    throw new Error("Email not available");
                }

                // @ts-ignore
                let user = await adapter.getUserByEmail(email);

                // If no user is found, then we create one.
                if (!user) {
                    // @ts-ignore
                    user = await adapter.createUser({
                        name: [given_name, family_name].join(" "),
                        email,
                        image,
                        emailVerified: email_verified ? new Date() : null,
                    });
                }

                // @ts-ignore
                let account = await adapter.getUserByAccount({
                    provider: "google",
                    providerAccountId: sub,
                });

                if (!account && user) {
                    // @ts-ignore
                    await adapter.linkAccount({
                        userId: user.id,
                        provider: "google",
                        provider_account_id: sub,
                        type: "oauth",
                        id_token: token,
                        expires_at: exp,
                        token_type: "Bearer",
                        access_token: at_hash,
                    });
                }

                return user;
            },
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: GOOGLE_AUTHORIZATION_URL,
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_ID,
            clientSecret: process.env.TWITTER_SECRET,
            version: "2.0", // opt-in to Twitter OAuth 2.0
        }),
    ],
    session: {
        strategy: "jwt",
    },
};
