import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// const legacyPrefixes = ['/profile', '/tracked-products', '/settings']
// export default async function middleware(req: NextRequest) {
//     const {pathname} = req.nextUrl
//     const token = await getToken({req})
//     if (legacyPrefixes.some((prefix) => pathname.startsWith(prefix))) {
//         if (token) {
//             console.log("JSON Web Token", JSON.stringify(token, null, 2))
//             return NextResponse.next()
//         } else {
//             return NextResponse.redirect(new URL('/', req.url))
//         }
//     }
// }
//
// export const config = {matcher: ['/profile/:path*', '/tracked-products/:path*', '/settings/:path*']}

const legacyPrefixes = ["/tracked-products"];
export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req });
  if (legacyPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    if (token) {
      console.log("JSON Web Token", JSON.stringify(token, null, 2));
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}

export const config = { matcher: ["/tracked-products/:path*"] };
