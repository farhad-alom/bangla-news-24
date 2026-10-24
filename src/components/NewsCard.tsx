import Image from 'next/image';
import ArticleLink from './ArticleLink';

interface News {
    id?: string;
    _id?: string;
    link?: string | null;
    title: string;
    description?: string | null;
    category?: string | null;
    imageUrl?: string | null;
    imageAlt?: string | null;
}

const NewsCard = ({ news }: { news: News }) => {
    return (
        <ArticleLink item={news} className="block h-full">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
                {news.imageUrl && (
                    <div className="relative h-48 w-full">
                        <Image
                            src={news.imageUrl}
                            fill
                            alt={news.imageAlt || "সংবাদ ছবি"}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                        />
                    </div>
                )}
                <div className="p-4 flex flex-col flex-grow justify-between">
                    <div>
                        {news.category && (
                            <p className="text-red-500 text-xs font-semibold mb-1 uppercase">{news.category}</p>
                        )}
                        <h3 className="text-sm font-bold text-gray-800 line-clamp-2 hover:text-red-600 cursor-pointer">
                            {news.title}
                        </h3>
                    </div>
                </div>
            </div>
        </ArticleLink>
    );
};

export default NewsCard;
// [cite: 8]
