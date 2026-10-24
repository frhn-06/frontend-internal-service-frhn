import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JWTExtended, SessionExtended, UserExtended } from "./types/auth";



export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        identifier: {
          label: "Identifier",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          // `${process.env.NEXT_PUBLIC_API_URL_LOCAL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              identifier: credentials.identifier,
              password: credentials.password,
            }),
          }
        );

        const result = await response.json();

        if (!response.ok) return null;

        const accessToken = result.data;
          
        // const responseMe = await fetch(`${process.env.NEXT_PUBLIC_API_URL_LOCAL}/auth/me`, {
        const responseMe = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }
        });

        
        const resultMe = await responseMe.json();

        if(!responseMe.ok) return null;
        
        const user = resultMe.data;

        if(accessToken && user.id) {
          return {
            ...user,
            accessToken
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user } : {token: JWTExtended; user: UserExtended}) {
      if (user) {
        token.accessToken = user?.accessToken;
        token.user = user;
      }

      return token;
    },

    async session({ session, token } : {session: SessionExtended; token: JWTExtended}) {
      session.accessToken = token.accessToken as string | undefined;
      session.user = token.user;

      return session;
    },
  },
});