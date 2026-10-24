import { createAuthClient } from "better-auth/react";

// ব্রাউজারে baseURL না দিলে বর্তমান origin + /api/auth ব্যবহার হয়।
// ভিন্ন ডোমেইনে হোস্ট করলে NEXT_PUBLIC_BETTER_AUTH_URL সেট করুন।
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || undefined,
});
