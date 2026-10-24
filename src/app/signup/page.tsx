"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage, isValidEmail, MIN_PASSWORD_LENGTH } from "@/lib/auth-errors";

const SignUpPage = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        const formData = new FormData(event.currentTarget);
        const name = String(formData.get("name") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");
        const confirmPassword = String(formData.get("confirmPassword") ?? "");

        if (name.length < 2) {
            setError("আপনার পুরো নাম লিখুন।");
            return;
        }

        if (!isValidEmail(email)) {
            setError("সঠিক ইমেইল ঠিকানা দিন।");
            return;
        }

        if (password.length < MIN_PASSWORD_LENGTH) {
            setError(`পাসওয়ার্ড কমপক্ষে ${MIN_PASSWORD_LENGTH} অক্ষরের হতে হবে।`);
            return;
        }

        if (password !== confirmPassword) {
            setError("পাসওয়ার্ড দুইবার একই হয়নি।");
            return;
        }

        setPending(true);
        const { error: signUpError } = await authClient.signUp.email({
            name,
            email,
            password,
        });
        setPending(false);

        if (signUpError) {
            setError(authErrorMessage(signUpError));
            return;
        }

        router.push("/");
        router.refresh();
    };

    return (
        <div className="flex flex-col justify-center items-center mt-6">
            <h2 className="text-2xl font-bold text-red-700 pb-3">সাইন আপ</h2>

            <form onSubmit={onSubmit} noValidate>
                <fieldset className="justify-center fieldset w-md pl-4" disabled={pending}>
                    <label className="label" htmlFor="name">নাম</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="input w-md"
                        placeholder="আপনার নাম"
                        autoComplete="name"
                        required
                    />

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
                        placeholder="কমপক্ষে ৮ অক্ষর"
                        autoComplete="new-password"
                        minLength={MIN_PASSWORD_LENGTH}
                        required
                    />

                    <label className="label" htmlFor="confirmPassword">পাসওয়ার্ড নিশ্চিত করুন</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className="input w-md"
                        placeholder="আবার পাসওয়ার্ড লিখুন"
                        autoComplete="new-password"
                        minLength={MIN_PASSWORD_LENGTH}
                        required
                    />

                    {error && (
                        <p role="alert" aria-live="polite" className="w-md mt-3 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                            {error}
                        </p>
                    )}

                    <button type="submit" className="btn text-white bg-red-600 mt-4" disabled={pending}>
                        {pending ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ করুন"}
                    </button>
                </fieldset>
            </form>

            <p className="text-sm text-gray-600 mt-4">
                ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                <Link href="/signin" className="text-red-600 font-semibold hover:underline">
                    সাইন ইন করুন
                </Link>
            </p>
        </div>
    );
};

export default SignUpPage;
