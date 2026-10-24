import Image from 'next/image';
import Link from 'next/link';

interface News {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageAlt: string;
}

const NewsCard = ({ news }: { news: News }) => {
    console.log('News Card', news);
    return (
        <Link href={`/news/${news.id}`}>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full">
                    <Image
                        src={news.imageUrl}
                        fill
                        alt={news.imageAlt || "News Card Image"}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>
                <div className="p-4 flex flex-col flex-grow justify-between">
                    <div>
                        <p className="text-red-500 text-xs font-semibold mb-1 uppercase">{news.category}</p>
                        <h3 className="text-sm font-bold text-gray-800 line-clamp-2 hover:text-red-600 cursor-pointer">
                            {news.title}
                        </h3>
                    </div>
                </div>
            </div>

        </Link>
    );
};

export default NewsCard;
