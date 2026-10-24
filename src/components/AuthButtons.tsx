"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const AuthButtons = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const onSignOut = async () => {
        const { error } = await authClient.signOut();

        if (error) {
            console.error("Sign out failed:", error);
            return;
        }

        router.refresh();
    };

    if (isPending) {
        return <div className="h-9" aria-hidden="true" />;
    }

    if (session?.user) {
        return (
            <div className="flex items-center justify-center md:justify-end gap-2">
                <span
                    className="text-sm font-medium text-gray-700 truncate max-w-[10rem]"
                    title={session.user.email}
                >
                    {session.user.name || session.user.email}
                </span>
                <button
                    type="button"
                    onClick={onSignOut}
                    className="text-sm font-medium text-gray-700 hover:text-black px-3 py-1.5"
                >
                    সাইন আউট
                </button>
            </div>
        );
    }

    return (
        <div className="flex gap-3 justify-center md:justify-end">
            <Link href="/signin" className="text-gray-700 hover:text-black text-sm font-medium px-3 py-1.5">
                সাইন ইন
            </Link>
            <Link href="/signup" className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-1.5 rounded transition-colors">
                সাইন আপ
            </Link>
        </div>
    );
};

export default AuthButtons;
