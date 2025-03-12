"use client";
import { IconChevronDown } from "@/assets/images";
import { Button } from "@/components/ui";
import { DEFAULT_COLLECTION_LIMIT } from "@/utils/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useCallback } from 'react';

const Pagination = (
    {
        range = DEFAULT_COLLECTION_LIMIT,
        totalItems,
        currentItems,
        buttonText = "Load more",
        collectionName
    }) => {

    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const limitParam = searchParams.get("limit");
    const limitParamNumber = useMemo(() => parseInt(limitParam || range), [limitParam, range])

    const handleLoadMore = useCallback(() => {
        const params = new URLSearchParams(searchParams);
        const nextLimit = Math.min(limitParamNumber + range, totalItems);
        params.set("limit", nextLimit.toString());
        replace(`${pathname}?${params.toString()}`, { scroll: false })
    }, [limitParamNumber, range, totalItems, searchParams, pathname, replace]);

    if (!totalItems || currentItems >= totalItems) return null;

    return (
        <div className="flex flex-col justify-center items-center mt-4 md:mt-8 mb-4 md:mb-8 gap-y-3">
            {/* <p className="text-sm md:text-base">{currentItems} / {totalItems} {collectionName.toLowerCase()}</p> */}
            <button
                className="text-sm md:text-base font-semibold text-lightBlue hover:text-darkBlue flex items-center gap-x-2"
                onClick={handleLoadMore}
            >
                {buttonText}
                <IconChevronDown className="inline-block" />
            </button>
        </div>
    )
};

export default Pagination;