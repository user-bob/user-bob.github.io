import NextAuth from "next-auth"
// import {authOptions} from "@/lib/auth";

const handler = NextAuth({
	// Configure one or more authentication providers
	providers: []
})
// const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
