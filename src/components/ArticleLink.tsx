import Link from "next/link";
import type { ReactNode } from "react";
import { articlePath, type ArticleRef } from "@/lib/article-link";

interface ArticleLinkProps {
    item: ArticleRef;
    className?: string;
    children: ReactNode;
}

const ArticleLink = ({ item, className, children }: ArticleLinkProps) => {
    const href = articlePath(item);

    if (!href) {
        return <span className={className}>{children}</span>;
    }

    // এপিআই-এর বাইরের লিংক (সোশ্যাল মিডিয়া কার্ড) নতুন ট্যাবে খোলা হয়
    if (!href.startsWith("/")) {
        return (
            <a href={href} className={className} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        );
    }

    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    );
};

export default ArticleLink;
