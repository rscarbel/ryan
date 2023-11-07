import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import prisma from "@/services/globalPrismaClient";

export const options: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          firstName: profile.given_name,
          lastName: profile.family_name,
          imageUrl: profile.picture,
        };
      },
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      authorization: {
        params: { scope: "openid profile email" },
      },
      issuer: "https://www.linkedin.com",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      profile(profile, tokens) {
        return {
          id: profile.sub,
          email: profile.email,
          firstName: profile.given_name,
          lastName: profile.family_name,
          imageUrl: profile.picture,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.id,
          email: profile.email,
          firstName: profile.name.split(" ")[0],
          lastName: profile.name.split(" ").slice(1).join(" "),
          imageUrl: profile.avatar_url,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  events: {
    async signIn(message) {},
    async signOut(message) {},
    async createUser(message) {},
    async updateUser(message) {},
    async linkAccount(message) {},
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const email = user.email;
      if (!email) {
        return false;
      }
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              email: email,
              firstName: user.firstName,
              lastName: user.lastName,
              imageURL: user.imageUrl,
              oAuth: {
                create: {
                  provider: account.provider,
                  externalId: account.providerAccountId,
                },
              },
            },
            include: {
              oAuth: true,
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user }) {
      return session;
    },
    async jwt({ token, user, account, profile }) {
      return token;
    },
  },
};
