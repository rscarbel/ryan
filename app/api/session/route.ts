import { getServerSession } from "next-auth/next";
import AuthorizationOptions from "../auth/[...nextauth]/authorizationOptions";
export async function GET(Request) {
  const session = await getServerSession(AuthorizationOptions);
  if (session) {
    console.log("Session", JSON.stringify(session, null, 2));
    return new Response("Welcome authenticated user", {
      status: 200,
    });
  } else {
    return new Response("Unauthorized access detected", {
      status: 401,
    });
  }
}
