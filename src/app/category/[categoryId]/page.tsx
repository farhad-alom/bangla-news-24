import NewsCard from "@/components/NewsCard";

// ১. ইন্টারফেসে _id এবং id উভয়টি অপশনাল বা অন্তর্ভুক্ত করা হলো
interface News {
    _id?: string;
    id?: string;
    title: string;
    description: string;
    category: string;
    imageUrl?: string;
    imageAlt?: string;
    [key: string]: any; // অতিরিক্ত প্রপার্টি হ্যান্ডেল করার জন্য
}

const CategoryNews = async ({ params }: { params: Promise<{ categoryId: string }> }) => {
    const { categoryId } = await params;

    let categoryNews: News[] = [];
    let title: string | undefined;

    // ২. সঠিক এপিআই এন্ডপয়েন্ট ব্যবহার করা (যদি আগেরটি সঠিক হয়ে থাকে)
    try {
        const res = await fetch(`https://news-api-v2.vercel.app/api/news/category/${categoryId}`);

        if (res.ok) {
            const data = await res.json();
            categoryNews = Array.isArray(data) ? data : (data?.data || []);
            title = data?.title;
        }
    } catch (error) {
        console.error("Failed to fetch category news:", error);
    }

    return (
        <div className="p-5 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold border-b-2 border-red-700 bg-red-700 text-white p-3 mb-6 rounded">
                {title || categoryId.toUpperCase()}
            </h1>
       
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryNews.length > 0 ? (
                    categoryNews.map((news) => (
                        <NewsCard key={news._id || news.id} news={news} />
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full text-center py-10">
                        এই ক্যাটাগরিতে কোনো নিউজ পাওয়া যায়নি।
                    </p>
                )}
            </div>
        </div>
    );
};

export default CategoryNews;