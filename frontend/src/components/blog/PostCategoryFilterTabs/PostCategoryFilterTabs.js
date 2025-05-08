"use client";

import { Link } from "@/i18n/routing";
import cx from "classnames";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

function PostCategoryFilterTabs({ categories, activeCategory }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [currentCategory, setCurrentCategory] = useState(activeCategory || null);

    const handleCategoryClick = (e, slug = null) => {
        e.preventDefault();

        // Update local state immediately for responsive UI
        setCurrentCategory(slug);

        startTransition(() => {
            const params = new URLSearchParams(searchParams);

            if (slug) {
                params.set('category', slug);
            } else {
                params.delete('category');
            }

            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        });
    };

    return (
        <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-x-7 border-b border-[#E5E5E7] mb-8 min-w-max">
                <Link
                    href="/blog"
                    onClick={(e) => handleCategoryClick(e)}
                    className={cx(`py-4 text-sm md:text-base font-medium transition-colors relative`, {
                        [`text-lightBlue border-b-2 ${isPending && !currentCategory ? "animate-pulse" : ""} border-lightBlue font-semibold -mb-px`]: !currentCategory,
                        "text-lightGrayText hover:text-lightBlue": currentCategory,
                    })}
                >
                    All Posts
                </Link>

                {categories?.map((category) => {
                    const { name, slug } = category?.attributes;
                    const isActive = currentCategory === slug;

                    return (
                        <Link
                            key={category?.id}
                            href={`/blog?category=${slug}`}
                            onClick={(e) => handleCategoryClick(e, slug)}
                            className={cx(`py-4 text-sm md:text-base font-medium transition-colors relative`, {
                                [`text-lightBlue border-b-2 ${isPending && isActive ? "animate-pulse" : ""} border-lightBlue font-semibold -mb-px`]: isActive,
                                "text-lightGrayText hover:text-lightBlue": !isActive,
                            })}
                        >
                            {name}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default PostCategoryFilterTabs;