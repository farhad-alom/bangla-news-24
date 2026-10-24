// better-auth থেকে আসা এরর কোডগুলোর বাংলা বার্তা
const AUTH_ERROR_MESSAGES: Record<string, string> = {
    INVALID_EMAIL_OR_PASSWORD: "ইমেইল বা পাসওয়ার্ড সঠিক নয়।",
    INVALID_EMAIL: "সঠিক ইমেইল ঠিকানা দিন।",
    INVALID_PASSWORD: "পাসওয়ার্ড সঠিক নয়।",
    PASSWORD_TOO_SHORT: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।",
    PASSWORD_TOO_LONG: "পাসওয়ার্ড ১২৮ অক্ষরের বেশি হতে পারবে না।",
    USER_ALREADY_EXISTS: "এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট আছে।",
    USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট আছে। অন্য ইমেইল ব্যবহার করুন।",
    VALIDATION_ERROR: "ইনপুট সঠিক নয়। ইমেইল ঠিকানাটি যাচাই করে আবার চেষ্টা করুন।",
    INVALID_ORIGIN: "অনুরোধের উৎস যাচাই করা যায়নি। পেজটি রিফ্রেশ করে আবার চেষ্টা করুন।",
};

export const MIN_PASSWORD_LENGTH = 8;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
    return EMAIL_PATTERN.test(value);
}

type AuthErrorLike = {
    code?: unknown;
    message?: unknown;
};

export function authErrorMessage(error: unknown): string {
    if (!error) {
        return "কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।";
    }

    if (typeof error === "object") {
        const { code, message } = error as AuthErrorLike;

        if (typeof code === "string" && AUTH_ERROR_MESSAGES[code]) {
            return AUTH_ERROR_MESSAGES[code];
        }

        // নেটওয়ার্ক বা সার্ভার সমস্যা — কাঁচা ইংরেজি মেসেজ ব্যবহারকারীকে দেখানো হয় না
        if (typeof message === "string" && /fetch|network|connect/i.test(message)) {
            return "সার্ভারের সঙ্গে সংযোগ করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।";
        }
    }

    return "কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।";
}
