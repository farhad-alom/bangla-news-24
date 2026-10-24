import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI;
const baseURL = process.env.BETTER_AUTH_URL?.trim();
const secret = process.env.BETTER_AUTH_SECRET;

if (!mongoUri) {
    throw new Error("MONGODB_URI environment variable is not set. Add it to .env (see .env.example).");
}

if (!secret) {
    throw new Error("BETTER_AUTH_SECRET environment variable is not set. Add it to .env (see .env.example).");
}

// ডেভ সার্ভারে HMR হলেও একই কানেকশন ব্যবহার করা হয়, নাহলে প্রতিবার নতুন ক্লায়েন্ট তৈরি হয়
const globalForMongo = globalThis as typeof globalThis & { __mongoClient?: MongoClient };
const client = globalForMongo.__mongoClient ?? new MongoClient(mongoUri);

if (process.env.NODE_ENV !== "production") {
    globalForMongo.__mongoClient = client;
}

const db = client.db("bangla-news-24-app"); // db name

export const auth = betterAuth({
    baseURL,
    secret,

    // পাসওয়ার্ড hashing (scrypt) এবং যাচাই better-auth নিজেই সামলায়
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 8,
        maxPasswordLength: 128,
        autoSignIn: true,
    },

    database: mongodbAdapter(db, {
        client,
    }),
});
