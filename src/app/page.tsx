import MainNews from '@/components/MainNews';
import MostRead from '@/components/MostRead';
import NewsCard from '@/components/NewsCard';

interface Article {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  type: string;
  isLive: boolean;
  firstPublished: string;
  lastPublished: string;
  source: string;
}

interface Section {
  title: string;
  curationId: string;
  curationType: string;
  link: string | null;
  count: number;
  articles: Article[];
}

export default async function HomePage() {
  let sections: Section[] = [];

  try {
    const res = await fetch(
      'https://news-api-v2.vercel.app/api/news/sections',
      { cache: 'no-store' }
    );

    if (res.ok) {
      const data: { data: Section[] } = await res.json();
      sections = data?.data || [];
    }
  } catch (error) {
    console.error("Failed to fetch news sections:", error);
  }

  if (sections.length === 0) {
    return <div className="text-center py-10">কোনো ডেটা পাওয়া যায়নি।</div>;
  }

  const mainNews = sections[0]?.articles || [];
  const othersSections = sections.slice(1);

  return (
    <div className="pb-10">
      {/* মূল গ্রিড লেআউট: মোবাইলে ১ কলাম, ডেস্কটপে ৩ কলাম */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* মেইন নিউজ ও অন্যান্য সেকশন (ডেস্কটপে ২ কলাম জায়গা নেবে) */}
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-8">
          <MainNews news={mainNews} />

          {othersSections.map((os) => (
            <div key={os.curationId} className="space-y-4">
              <h1 className="font-bold text-xl border-b-2 border-red-500 pb-2 text-gray-800">
                {os.title}
              </h1>

              {/* ক্যাটাগরি কার্ডগুলোর রেসপনসিভ গ্রিড */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {os.articles.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* সর্বাধিক পঠিত অংশ (১ কলাম) */}
        <div>
          <MostRead />
        </div>

      </div>
    </div>
  );
}
