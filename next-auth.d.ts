import "next-auth/jwt"

declare module "next-auth/jwt" {
    interface JWT {
        /** The user's role. */
        userRole?: "admin"
        /** User's email status */
        emailVerified?: boolean
        /** User's email provider */
        provider?: string
    }
}
