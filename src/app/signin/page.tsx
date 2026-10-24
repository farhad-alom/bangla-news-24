"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage, isValidEmail } from "@/lib/auth-errors";

const SignInPage = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        const formData = new FormData(event.currentTarget);
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");

        if (!isValidEmail(email)) {
            setError("সঠিক ইমেইল ঠিকানা দিন।");
            return;
        }

        if (!password) {
            setError("পাসওয়ার্ড লিখুন।");
            return;
        }

        setPending(true);
        const { error: signInError } = await authClient.signIn.email({
            email,
            password,
            rememberMe: true,
        });
        setPending(false);

        if (signInError) {
            setError(authErrorMessage(signInError));
            return;
        }

        router.push("/");
        router.refresh();
    };

    return (
        <div className="flex flex-col justify-center items-center mt-6">
            <h2 className="text-2xl font-bold text-red-700 pb-3">সাইন ইন</h2>

            <form onSubmit={onSubmit} noValidate>
                <fieldset className="justify-center fieldset w-md pl-4" disabled={pending}>
                    <label className="label" htmlFor="email">ইমেইল</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="input w-md"
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                    />

                    <label className="label" htmlFor="password">পাসওয়ার্ড</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="input w-md"
                        placeholder="আপনার পাসওয়ার্ড"
                        autoComplete="current-password"
                        required
                    />

                    {error && (
                        <p role="alert" aria-live="polite" className="w-md mt-3 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                            {error}
                        </p>
                    )}

                    <button type="submit" className="btn text-white bg-red-600 mt-4" disabled={pending}>
                        {pending ? "সাইন ইন হচ্ছে..." : "সাইন ইন করুন"}
                    </button>
                </fieldset>
            </form>

            <p className="text-sm text-gray-600 mt-4">
                নতুন অ্যাকাউন্ট খুলতে চান?{" "}
                <Link href="/signup" className="text-red-600 font-semibold hover:underline">
                    সাইন আপ করুন
                </Link>
            </p>
        </div>
    );
};

export default SignInPage;
