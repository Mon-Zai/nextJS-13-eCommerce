import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/db'

export const options: NextAuthOptions = {
    pages:{
        signIn:"/SignIn",
    },
    session:{
        strategy:"jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                },
                email: {
                    label: "email",
                    type: "text",
                },
                isAdmin: {
                    label: "email",
                    type: "text",
                },
            },
            async authorize(credentials) {
                console.log("auth");
                // This is where you need to retrieve user data 
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                if(!credentials?.email || !credentials?.password){
                    console.log("Email or Password empty")
                    return null;
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })
                if(user===null){
                    console.log("User is null, returning...")
                    return null;
                }else{
                    if (credentials?.email === user.email && credentials?.password === user.password) {
                        console.log("User found, successfully logged in")
                        return {
                            id: user.id,
                            email:user.email,
                            name: user.name,
                            isAdmin:user.isAdmin,
                        }
                    } else {
                        console.log("User not found, submit valid credentials")
                        return null
                    }
                }
            }
        })
    ],
    callbacks: {
        session: ({ session, token }) => {
          return {
            ...session,
            user: {
              ...session.user,
              id: token.id,
              isAdmin: token.isAdmin,
            },
          };
        },
        jwt: ({ token, user }) => {
          if (user) {
            const u = user as unknown as any;
            return {
              ...token,
              id: u.id,
              isAdmin: u.isAdmin,
            };
          }
          return token;
        },
      },

}