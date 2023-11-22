import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "@/auth/actions/actions";


export const authOptions: NextAuthOptions = {

    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Correo electrónico", type: "email", placeholder: "usuario@google.com" },
                password: { label: "Contraseña", type: "password", placeholder:'***' }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = await signInEmailPassword(credentials!.email, credentials!.password)

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],

    session: {
        strategy: 'jwt'
    },

    callbacks: {
        // async signIn({user, account, profile, email, credentials}) {

        //     return true;
        // }
        async jwt({ token, user, account, profile }) {
            const dbUser = await prisma.user.findUnique({ where: { email: token.email! } })

            if (dbUser?.isActive === false) {
                throw Error('Usuario no está activo')
            }

            token.roles = dbUser?.roles ?? ['no-roles'];
            token.id = dbUser?.id ?? 'no-uuid';
            token.isActive = dbUser?.isActive

            return token;
        },
        async session({ session, token, user }) {
            if (session && session.user) {
                session.user.roles = token.roles;
                session.user.id = token.id;
                session.user.isActive = token.isActive;
            }
            return session;
        }
    }

}


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };