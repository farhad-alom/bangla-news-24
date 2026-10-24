import Image from "next/image";
import React from "react";

interface NewsDetailsPageProps {
    params: Promise<{ newsId: string }>;
}

interface NewsData {
    category?: string;
    publishedAt?: string;
    title: string;
    description: any;
    imageUrl?: string;
    imageAlt?: string;
    source?: string;
}

export default async function NewsDetailsPage({ params }: NewsDetailsPageProps) {
    const { newsId } = await params;

    let news: NewsData | null = null;

    try {
        const res = await fetch(`https://news-api-v2.vercel.app/api/article/${newsId}`);
        const data = await res.json();
        news = data?.data || null;
    } catch (error) {
        console.error("Failed to fetch news details:", error);
    }

    if (!news) {
        return (
            <div className="text-center py-20 text-gray-500">
                খবরটি পাওয়া যায়নি বা লোড করতে সমস্যা হয়েছে।
            </div>
        );
    }

    // যেকোনো জটিল অবজেক্ট বা ব্লক থেকে স্বয়ংক্রিয়ভাবে টেক্সট খুঁজে বের করার ফাংশন
    const renderDescription = (content: any): React.ReactNode => {
        if (!content) return null;

        // যদি সরাসরি টেক্সট বা স্ট্রিং হয়
        if (typeof content === 'string') {
            return <p className="mb-4">{content}</p>;
        }

        // যদি এটি অ্যারে হয় (যেমন blocks অ্যারে)
        if (Array.isArray(content)) {
            return content.map((item, index) => (
                <React.Fragment key={index}>
                    {renderDescription(item)}
                </React.Fragment>
            ));
        }

        // যদি এটি অবজেক্ট হয়
        if (typeof content === 'object') {
            // যদি অবজেক্টের সরাসরি text বা content প্রপার্টি থাকে
            if (typeof content.text === 'string') {
                return <p className="mb-4">{content.text}</p>;
            }
            if (typeof content.content === 'string') {
                return <p className="mb-4">{content.content}</p>;
            }

            // অন্যথায় অবজেক্টের ভেতরের সমস্ত প্রপার্টি চেক করে টেক্সট বের করা
            return Object.values(content).map((val, index) => (
                <React.Fragment key={index}>
                    {renderDescription(val)}
                </React.Fragment>
            ));
        }

        return null;
    };

    return (
        <main className="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-sm my-6">
            
            {/* ক্যাটাগরি ও প্রকাশের সময় */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <span className="text-red-500 font-semibold uppercase">{news.category || "সংবাদ"}</span>
                <span>•</span>
                <span>{news.publishedAt || ""}</span>
            </div>

            {/* শিরোনাম */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {news.title}
            </h1>

            {/* বিবরণ */}
            <div className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed font-medium">
                {renderDescription(news.description)}
            </div>

            {/* ছবি */}
            {news.imageUrl && (
                <div className="relative h-64 sm:h-96 w-full mb-2 rounded-lg overflow-hidden">
                    <Image
                        src={news.imageUrl}
                        alt={news.imageAlt || "News Image"}
                        fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            {/* ছবির ক্যাপশন */}
            {news.imageAlt && (
                <p className="text-xs text-gray-500 mb-6 italic">
                    {news.imageAlt}
                </p>
            )}

            {/* উৎস */}
            {news.source && (
                <div className="text-sm text-gray-600 border-t pt-4">
                    উৎস: <span className="font-semibold text-gray-800">{news.source}</span>
                </div>
            )}

        </main>
    );
}