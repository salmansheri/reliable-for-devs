import { AuthOptions, getServerSession } from "next-auth";
import prisma from "../prismaDB";
import { PrismaAdapter } from '@auth/prisma-adapter'; 
import GithubProvider from 'next-auth/providers/github'; 
import CredentialsProvider from "next-auth/providers/credentials";
import { nanoid } from 'nanoid'; 
import bcrypt from 'bcrypt'; 

export const authOptions: AuthOptions = {
    // @ts-ignore
    adapter: PrismaAdapter(prisma), 
    providers: [
      
        CredentialsProvider({
            name: "credentials", 
            credentials: {
                email: { type: "email", label:"email" }, 
                password: { type: "password", label:"password" }
            }, 
            async authorize(credentials) {
                if(!credentials || !credentials.password ) {
                    console.log("Credentials does not exist")
                    throw new Error("Invalid credentials")
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email, 
                    }
                })

                if(!user || !user.password) {
                    console.log("Email doesnt not exist")
                    throw new Error("Invalid credentials");
                } 

                const isCorrectPassword = await bcrypt.compare(credentials.password, user.password); 

                if(!isCorrectPassword) {
                    console.log("Password does not match")
                    throw new Error("");
                }

                return user;
                


            }, 
        
        })

    ], 
    session: {
        strategy: 'jwt', 
    }, 
    pages: {
        signIn: "/sign-in", 
    }, 

    // callbacks: {
    //   async session({ token, session }) {

    //     if(!session) {
    //       return; 
    //     }
    //     if(token) {
    //       // @ts-ignore 
    //       session.user.email = token.email;
    //       // @ts-ignore 

    //       session.user.image = token.picture;
    //       // @ts-ignore 
    //       session.user.name = token.name; 
    //       // @ts-ignore 

          
    //     }

    //     return session

    //   }, 
    //   async jwt({ token, user }) {
    //     const userExist = await prisma.user.findFirst({
    //       where: {
    //         email: token.email, 
    //       }
    //     }); 

    //     if(!userExist) {
    //       return token; 
    //     }

    //     return {
    //       name: userExist.name, 
    //       email: userExist.email, 
    //       image: userExist.image, 
    //     }
    //   }, 
    //   async signIn({ user }) {
    //     const userExist = await prisma.user.findFirst({
    //       where: {
    //         email: user?.email, 
    //       }
    //     }); 

    //     if(!userExist) {
    //       await prisma.user.create({
    //         data: {
    //           email: user?.email,
    //           name: user.image,
    //         }
    //       })
    //     }

    //   }
    // }
   
   
    
    
}

export async function getCurrentUser() {
    const currentUser = await getServerSession(authOptions); 
    return currentUser; 



}