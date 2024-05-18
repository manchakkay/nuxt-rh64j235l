// file: ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from '#auth'
import GoogleProvider from 'next-auth/providers/google'
const runtimeConfig = useRuntimeConfig()

export default NuxtAuthHandler({
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/login',
        signOut: '/logout',
    },
    session: {
        strategy: "jwt",
    },
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GoogleProvider.default({
            clientId: runtimeConfig.GoogleOAuth.clientID,
            clientSecret: runtimeConfig.GoogleOAuth.clientSecret,
        })
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token
            }
            return token;
        },
        async session({ session, token }) {
            return session;
        },
    }
})

