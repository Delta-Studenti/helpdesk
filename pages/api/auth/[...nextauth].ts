import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.IdentityServer4({
      id: "identity-server4",
      name: "Delta - Identity Server",
      scope: "openid profile name email roles",
      params: { grant_type: "authorization_code" },
      domain: "identita.delta-skola.cz",
      clientId: "helpdesk",
      clientSecret: process.env.NEXT_PUBLIC_IS_CLIENT_SECRET,
    }),
  ],
  database: process.env.NEXT_PUBLIC_DB_CONN,
  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      if (profile) {
        token.profile = profile;
      }
      return Promise.resolve(token);
    },
    session: async (session, user) => {
      return Promise.resolve({
        ...session,
        user: { ...user },
      });
    },
  },
});
