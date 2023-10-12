import Providers from "next-auth/providers";
import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import LinkedInProvider from "next-auth/providers/linkedin";
import EmailProvider from "next-auth/providers/email";
import bcrypt from "bcrypt";

async function verifyPassword(
  plainText: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainText, hashedPassword);
}

const options: AuthOptions = {
  providers: [
    Providers.Credentials({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await yourMethodToFindUser(credentials.email);
        if (user) {
          const isValid = await verifyPassword(
            credentials.password,
            user.passwordHash
          );
          if (isValid) {
            return Promise.resolve(user);
          }
        }
        return Promise.resolve(null);
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
    EmailProvider({
      server: process.env.EMAIL_SERVER as string,
      from: process.env.EMAIL_FROM as string,
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

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.id,
          email: profile.email,
          firstName: profile.first_name,
          lastName: profile.last_name,
          imageUrl: profile.picture.data.url,
        };
      },
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.id_str,
          email: profile.email,
          firstName: profile.name.split(" ")[0],
          lastName: profile.name.split(" ").slice(1).join(" "),
          imageUrl: profile.profile_image_url_https,
        };
      },
    }),

    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
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
  ],
  session: { strategy: "jwt" },
};

export default options;
