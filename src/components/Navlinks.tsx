import Link from 'next/link';


interface Navs {
    slug: string;
    title: string;
    topicId: string | null;
    url: string;
    scrapable: boolean;
}

const Navlinks = async () => {
    let filteredNavs: Navs[] = [];

    try {
        const res = await fetch('https://news-api-v2.vercel.app/api/categories', {
            cache: 'no-store'
        });
        
        if (res.ok) {
            const data = await res.json();
            const navs: Navs[] = data.data || [];
            filteredNavs = navs.filter(n => n.scrapable);
        }
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }

    return (
        <nav className='flex flex-wrap gap-4 md:gap-6 justify-center items-center text-gray-700 font-medium text-sm'>
            <Link href={'/'} className="hover:text-red-600 transition-colors">হোম</Link>

            {filteredNavs.length > 0 ? (
                filteredNavs.map((n) => (
                    <Link 
                        key={n.slug} 
                        href={`/category/${encodeURIComponent(n.slug)}`}
                        className="hover:text-red-600 transition-colors"
                    >
                        {n.title}
                    </Link>
                ))
            ) : (
                <span className="text-gray-400 text-xs">ক্যাটাগরি লোড হচ্ছে...</span>
            )}
        </nav>
    );
};

export default Navlinks;
// [cite: 7]