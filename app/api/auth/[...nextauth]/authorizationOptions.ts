import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import prisma from "@/services/globalPrismaClient";

const authorizationOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.id,
          email: profile.email,
          firstName: profile.given_name,
          lastName: profile.family_name,
          imageUrl: profile.picture,
        };
      },
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID ?? "",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.id,
          email: profile.emailAddress,
          firstName: profile.firstName.localized.en_US,
          lastName: profile.lastName.localized.en_US,
          imageUrl: profile.profilePicture.displayImage,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
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
    async signIn(message) {
      console.log(message);
    },
    async signOut(message) {
      console.log(message);
    },
    async createUser(message) {
      console.log(message);
    },
    async updateUser(message) {
      console.log(message);
    },
    async linkAccount(message) {
      console.log(message);
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider && profile.id) {
        const oauthUser = await prisma.oAuth.findUnique({
          where: {
            provider_externalId_userId: {
              provider: account.provider,
              externalId: profile.id.toString(),
              userId: user.id,
            },
          },
        });

        if (!oauthUser) {
          await prisma.oAuth.create({
            data: {
              provider: account.provider,
              externalId: profile.id.toString(),
              user: {
                connect: { id: user.id },
              },
            },
          });
        }
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user }) {
      if (session?.user && user?.id) {
        session.user.roles = user.roles;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        token.roles = user.roles;
      }

      if (isNewUser && account?.provider && profile?.id) {
        token.provider = account.provider;
        token.providerAccountId = profile.id;
      }

      return token;
    },
  },
};

export default authorizationOptions;
