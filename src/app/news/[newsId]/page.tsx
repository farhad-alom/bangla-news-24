import Image from "next/image";
import React from "react";

interface NewsDetailsPageProps {
    params: Promise<{ newsId: string }>;
}

type BodyBlock =
    | { type: "text"; text: string }
    | { type: "subheading"; text: string }
    | {
          type: "image";
          url: string;
          width?: number;
          height?: number;
          caption?: string | null;
          altText?: string | null;
      };

interface NewsData {
    category?: string;
    firstPublished?: string;
    title: string;
    description?: unknown;
    body?: BodyBlock[];
    imageUrl?: string;
    imageAlt?: string;
    source?: string;
}

// বাংলা তারিখ ফরম্যাট (ভুল বা খালি তারিখ হলে কিছু দেখানো হয় না)
const formatPublishedDate = (value?: string) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("bn-BD", { dateStyle: "long" });
};

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

    // এপিআই-এর বডি ব্লক (text / subheading / image) রেন্ডার করার ফাংশন
    const renderBody = (blocks: BodyBlock[]): React.ReactNode =>
        blocks.map((block, index) => {
            if (block.type === "subheading") {
                return (
                    <h2 key={index} className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-3">
                        {block.text}
                    </h2>
                );
            }

            if (block.type === "text") {
                return (
                    <p key={index} className="mb-4">
                        {block.text}
                    </p>
                );
            }

            if (block.type === "image") {
                return (
                    <figure key={index} className="my-6">
                        <Image
                            src={block.url}
                            alt={block.altText || "সংবাদ ছবি"}
                            width={block.width || 1120}
                            height={block.height || 630}
                            preload={index === 0}
                            className="w-full h-auto rounded-lg"
                        />
                        {block.caption && (
                            <figcaption className="text-xs text-gray-500 italic mt-2">
                                {block.caption}
                            </figcaption>
                        )}
                    </figure>
                );
            }

            return null;
        });

    // ফলব্যাক: এপিআই যদি body না দেয়, পুরোনো description ব্লক থেকে টেক্সট বের করা হয়।
    // শুধু নির্দিষ্ট কী-গুলোর ভেতরে নামা হয়, তাই ব্লকের type লেবেল ("text" / "paragraph") আর রেন্ডার হয় না।
    const renderDescription = (content: unknown): React.ReactNode => {
        if (!content) return null;

        if (typeof content === "string") {
            return <p className="mb-4">{content}</p>;
        }

        if (Array.isArray(content)) {
            return content.map((item, index) => (
                <React.Fragment key={index}>{renderDescription(item)}</React.Fragment>
            ));
        }

        if (typeof content === "object") {
            const node = content as {
                text?: unknown;
                content?: unknown;
                blocks?: unknown;
                model?: unknown;
            };

            if (typeof node.text === "string") {
                return <p className="mb-4">{node.text}</p>;
            }

            if (typeof node.content === "string") {
                return <p className="mb-4">{node.content}</p>;
            }

            return [node.blocks, node.model, node.content].map((child, index) => (
                <React.Fragment key={index}>{renderDescription(child)}</React.Fragment>
            ));
        }

        return null;
    };

    const publishedAt = formatPublishedDate(news.firstPublished);
    const body = news.body ?? [];

    return (
        <main className="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-sm my-6">
            {/* ক্যাটাগরি ও প্রকাশের সময় */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <span className="text-red-500 font-semibold uppercase">{news.category || "সংবাদ"}</span>
                <span>•</span>
                <span>{publishedAt}</span>
            </div>

            {/* শিরোনাম */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {news.title}
            </h1>

            {/* বিবরণ */}
            {body.length > 0 ? (
                <div className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed font-medium">
                    {renderBody(body)}
                </div>
            ) : (
                <>
                    <div className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed font-medium">
                        {renderDescription(news.description)}
                    </div>

                    {news.imageUrl && (
                        <div className="relative h-64 sm:h-96 w-full mb-2 rounded-lg overflow-hidden">
                            <Image
                                src={news.imageUrl}
                                alt={news.imageAlt || "সংবাদ ছবি"}
                                fill
                                sizes="(max-width: 768px) 100vw, 768px"
                                className="object-cover"
                            />
                        </div>
                    )}

                    {news.imageAlt && (
                        <p className="text-xs text-gray-500 mb-6 italic">
                            {news.imageAlt}
                        </p>
                    )}
                </>
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
