import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.IdentityServer4({
      id: "identity-server4",
      name: "Delta - Identity Server",
      scope: "openid profile email",
      params: { grant_type: "authorization_code" },
      domain: "identita.delta-skola.cz",
      clientId: "helpdesk",
      clientSecret: process.env.NEXT_PUBLIC_IS_CLIENT_SECRET,
    }),
  ],
});
