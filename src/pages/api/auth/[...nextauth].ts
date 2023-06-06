import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";
import {FirestoreAdapter} from "@next-auth/firebase-adapter";
import {firestore} from "@/lib/firestore";

let provider: string

export const authOptions: NextAuthOptions = {
    adapter: FirestoreAdapter(firestore),
    providers: [
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
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_ID,
            clientSecret: process.env.TWITTER_SECRET,
            // version: "2.0", // opt-in to Twitter OAuth 2.0
        }),
        Auth0Provider({
            clientId: process.env.AUTH0_ID,
            clientSecret: process.env.AUTH0_SECRET,
            issuer: process.env.AUTH0_ISSUER,
        }),
    ],
    theme: {
        colorScheme: "auto",
    },
    session: {strategy: "jwt"},
    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            const set_date = await FirestoreAdapter(firestore).updateUser({id: user.id, emailVerified: new Date()});
            provider = account?.provider ?? 'guest';
            return !!set_date;
        },
        async jwt({token}) {
            const user = await FirestoreAdapter(firestore).getUserByEmail(token?.email!);

            token.emailVerified = !!user?.emailVerified;
            token.provider = provider;
            token.userRole = 'admin';
            return token;
        },
    },

};

export default NextAuth(authOptions);
