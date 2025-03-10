import NextAuth, { DefaultSession } from 'next-auth';
import authConfig from './auth.config';

export const { auth, handlers, signOut, signIn } = NextAuth(authConfig);

export type TSession = {
    user?: {
        email?: string | null,
        accessToken?: string | null,
        role?: number | null
    } & DefaultSession['user'],
    expires: string
} | null
