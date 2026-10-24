import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface HeadLineItem {
    id: string;
    title: string;
}

const Marquee = async () => {
    let headlines: HeadLineItem[] = [];

    try {
        const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10", {
            cache: "no-store",
        });
        const data = await res.json();
        headlines = data?.data || [];
    } catch (error) {
        console.error("Marquee fetch error:", error);
    }

    if (headlines.length === 0) return null;

    return (
        <div className="bg-red-700 text-white w-full overflow-hidden shadow-sm">
            <div className="flex max-w-7xl mx-auto items-center">
                
                {/* সর্বশেষ লেবেল */}
                <div className="bg-red-800 py-1 px-5 font-bold whitespace-nowrap z-10 shadow-md">
                    সর্বশেষ
                </div>

                {/* মারকি টেক্সট ও লিংক */}
                <div className="flex-1 overflow-hidden ml-2">
                    <MarqueeText className="py-1 flex items-center" direction="right" duration={10}>
                        {headlines.map((h) => (
                            <Link

                                key={h.id}
                                href={`/news/${h.id}`}
                                className="hover:underline hover:text-yellow-200 cursor-pointer inline-flex items-center mx-4 transition-colors"
                            >
                                <span>{h.title}</span>
                                <span className="mx-5 text-yellow-300">•</span>
                            </Link>
                        ))}
                    </MarqueeText>
                </div>

            </div>
        </div>
    );
};

export default Marquee;