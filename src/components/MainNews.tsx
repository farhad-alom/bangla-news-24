import Image from "next/image";
import ArticleLink from "./ArticleLink";

interface NewsItem {
    id?: string;
    link?: string | null;
    imageUrl: string;
    imageAlt?: string | null;
    category?: string | null;
    title: string;
    description?: string | null;
}

export default function MainNews({ news }: { news: NewsItem[] }) {
    const [firstNews, ...otherNews] = news;

    if (!firstNews) {
        return <div className="text-gray-500">কোনো খবর পাওয়া যায়নি।</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            
            {/* ১. প্রধান লিড নিউজ */}
            <ArticleLink item={firstNews} className="group flex flex-col">
                <div className="relative h-64 sm:h-72 w-full mb-3">
                    <Image
                        src={firstNews.imageUrl}
                        alt={firstNews.imageAlt || "সংবাদ ছবি"}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
                {firstNews.category && (
                    <span className="text-red-500 text-xs font-semibold uppercase">{firstNews.category}</span>
                )}
                <h2 className="text-xl font-bold text-gray-900 mt-1 group-hover:text-red-600 line-clamp-2">
                    {firstNews.title}
                </h2>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">{firstNews.description}</p>
            </ArticleLink>

            {/* ২. অন্যান্য সাব-নিউজগুলো */}
            <div className="flex flex-col justify-between gap-3">
                {otherNews.slice(0, 4).map((item) => (
                    <ArticleLink 
                        key={item.id ?? item.title}
                        item={item}
                        className="group bg-gray-50 hover:bg-gray-100 border border-gray-200 p-3 rounded-lg transition-colors flex flex-col justify-center"
                    >
                        {item.category && (
                            <span className="text-red-500 text-[11px] font-semibold">{item.category}</span>
                        )}
                        <h3 className="text-sm font-semibold text-gray-800 mt-1 group-hover:text-red-600 line-clamp-2">
                            {item.title}
                        </h3>
                    </ArticleLink>
                ))}
            </div>

        </div>
    );
}
