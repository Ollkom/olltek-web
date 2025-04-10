"use client";
import { IconChevronDown } from "@/assets/images";
import { Button } from "@/components/ui";
import { DEFAULT_COLLECTION_LIMIT } from "@/utils/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useCallback, useTransition } from 'react';

const Pagination = (
    {
        range = DEFAULT_COLLECTION_LIMIT,
        totalItems,
        currentItems,
        buttonText = "Load more",
    }) => {

    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const limitParam = searchParams.get("limit");
    const limitParamNumber = useMemo(() => parseInt(limitParam || range), [limitParam, range])

    const handleLoadMore = useCallback(() => {
        startTransition(() => {
            const params = new URLSearchParams(searchParams);
            const nextLimit = Math.min(limitParamNumber + range, totalItems);
            params.set("limit", nextLimit.toString());
            replace(`${pathname}?${params.toString()}`, { scroll: false })
        })
    }, [limitParamNumber, range, totalItems, searchParams, pathname, replace]);

    if (!totalItems || currentItems >= totalItems) return null;

    return (
        <div className="flex flex-col justify-center items-center mt-4 md:mt-8 mb-4 md:mb-8 gap-y-3">
            <Button
                variant="primary"
                onClick={handleLoadMore}
                className="flex items-center gap-x-2"
                disabled={isPending}
            >
                {!isPending && buttonText}
                {isPending ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-5"></div>
                ) : (
                    <IconChevronDown className="inline-block" />
                )}
            </Button>
        </div>
    )
};

export default Pagination;