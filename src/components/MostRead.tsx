import React from 'react';
import Link from 'next/link';
interface NewsItem {
    id: string;
    title: string;
    slug?: string;
}

const MostRead = async () => {
    let mostReadNews: NewsItem[] = [];

    try {
        const res = await fetch('https://news-api-v2.vercel.app/api/news/most-read', {
            cache: 'no-store'
        });

        if (res.ok) {
            const data = await res.json();
            mostReadNews = data.data || [];
        }
    } catch (error) {
        console.error("Failed to fetch most read news:", error);
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm sticky top-4">
            <h2 className="font-bold text-lg mb-3 text-gray-800 border-b-2 border-red-500 pb-2">
                সর্বাধিক পঠিত
            </h2>
            
            {mostReadNews.length > 0 ? (
                <div className="flex flex-col divide-y divide-gray-100">
                    {mostReadNews.map((news, index) => (
                        <div
                            key={news.id || index}
                            className="flex items-start gap-3 py-3 group cursor-pointer"
                        >
                            {/* সিরিয়াল নাম্বার */}
                            <span className="flex shrink-0 text-base font-bold text-red-500 w-5">
                                {index + 1}.
                            </span>

                            {/* খবরের শিরোনাম */}
                           <Link href={`/news/${news.id}`}>
                                <p className="text-sm leading-snug text-gray-700 group-hover:text-red-600 transition-colors line-clamp-2 hover:underline">
                                {news.title}
                            </p>
                           </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="py-4 text-sm text-gray-400 text-center">
                    এই মুহূর্তে সর্বাধিক পঠিত খবর পাওয়া যাচ্ছে না।
                </p>
            )}
        </div>
    );
};

export default MostRead;
