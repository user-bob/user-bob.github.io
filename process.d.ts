declare namespace NodeJS {
    export interface ProcessEnv {
        NEXTAUTH_URL: string
        NEXTAUTH_SECRET: string
        GITHUB_ID: string
        GITHUB_SECRET: string
        FACEBOOK_ID: string
        FACEBOOK_SECRET: string
        TWITTER_ID: string
        TWITTER_SECRET: string
        GOOGLE_ID: string
        GOOGLE_SECRET: string
        FIREBASE_CLIENT_EMAIL: string
        FIREBASE_PROJECT_ID: string
        FIREBASE_PRIVATE_KEY: string
        NEXT_PUBLIC_GOOGLE_ID: string
        NEXT_PUBLIC_GOOGLE_SECRET: string
        CREDENTIALS_ID: string
        CREDENTIALS_NAME: string
    }
}