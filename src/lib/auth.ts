import { betterAuth } from "better-auth";
// import { reactStartCookies } from "better-auth/react-start";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/db"; // your drizzle instance
import "dotenv/config";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      enabled: true,
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
    google: {
      enabled: true,
      clientId: "",
      clientSecret: ""
    }
  },
});
