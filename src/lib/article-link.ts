// বিবিসি বাংলা এপিআই-এর নিবন্ধ আইডি সাধারণত "c" দিয়ে শুরু হয় (যেমন c9dr8n7pd4zko)।
// কিছু আইটেমের id আসলে এনকোড করা এক্সটার্নাল ইউআরএল (সোশ্যাল মিডিয়া কার্ড) বা UUID,
// যেগুলোর অভ্যন্তরীণ /news/ পেজ নেই — সেগুলো এপিআই-এর দেওয়া আসল link-এ পাঠানো হয়।
const ARTICLE_ID_PATTERN = /^c[a-z0-9]{6,}$/i;

export interface ArticleRef {
    id?: string | null;
    _id?: string | null;
    link?: string | null;
}

export function articlePath(ref: ArticleRef): string | null {
    const id = ref.id ?? ref._id;

    if (typeof id === "string" && ARTICLE_ID_PATTERN.test(id)) {
        return `/news/${id}`;
    }

    return ref.link || null;
}
