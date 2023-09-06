import {DefaultSession} from "next-auth"
import {AdapterUser} from "next-auth/adapters";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        error?: "RefreshAccessTokenError",
        user: {
            tracked_products?: string[]
        } & DefaultSession["user"] | AdapterUser
        access_token: string
    }
}


declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        access_token: string
        expires_at: number
        refresh_token: string
        provider: string
        user: {
            tracked_products?: string[]
        } & DefaultSession["user"] | AdapterUser
        error?: "RefreshAccessTokenError"
    }
}