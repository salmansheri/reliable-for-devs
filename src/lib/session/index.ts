import { getServerSession } from "next-auth/next";

import { NextAuthOptions, User } from "next-auth";

import { AdapterUser } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { SessionInterface } from "@/types";

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.NEXTAUTH_GITHUB_CLIENT_ID!, 
            clientSecret: process.env.NEXTAUTH_GITHUB_CLIENT_SECRET!, 
        })
    ], 
    secret: process.env.NEXTAUTH_SECRET, 
    session: {
        strategy: 'jwt', 
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
        // encode: ({ secret, token }) => {

        // }, 
        // decode: async ({ secret, token }) => {

        // }
    }, 
    theme: {
        colorScheme: 'dark', 
        logo: "/logo.png", 
    },
    callbacks: {
        async session({ session }) {
            return session

        }, 
        async signIn({ user }: { user: AdapterUser | User }) {
            try {
                // Get the User if they exist 

                // if they don't exist, create them 


                return true 
                
            } catch (error: any) {
                console.log(error); 
                return false; 

                
            }


        }, 
        redirect() {
            return "/"
        }
        
    }
}

export async function getCurrentUser() {
    const session = await getServerSession(authOptions) as SessionInterface; 

    if(!session?.user?.email) {
        return; 

    }

    return session; 
}

