import NextAuth from "next-auth";
import authorizationOptions from "./authorizationOptions";

const handler = NextAuth(authorizationOptions);

export { handler as GET, handler as POST };
