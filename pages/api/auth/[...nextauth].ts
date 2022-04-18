import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default NextAuth({
  theme: {
    colorScheme: "light",
    brandColor: "#FFA500", 
    logo: "https://logos-world.net/wp-content/uploads/2020/12/Etsy-Emblem.png"
  },


  callbacks: {
    session: async ({ session, user }) => {
      session.userId = user.id;    
      return Promise.resolve(session);
    }
  },
  
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
})