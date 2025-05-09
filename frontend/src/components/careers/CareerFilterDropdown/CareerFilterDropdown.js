"use client";

import { IconChevronDown } from "@/assets/images";
import { useTranslations } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

function CareerFilterDropdown({ label, options, activeValue, paramName }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [currentValue, setCurrentValue] = useState(activeValue || "all");
    const t = useTranslations("Global");
    const isDisabled = useMemo(() => {
        return options.length === 0;
    }, [options]);

    const handleChange = (e) => {
        const value = e.target.value;
        setCurrentValue(value);

        startTransition(async () => {
            const params = new URLSearchParams(searchParams);

            if (value === "all") {
                params.delete(paramName);
            } else {
                params.set(paramName, value);
            }

            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        });
    };

    return (
        <div className="bg-white px-2 xl:px-0">
            <label className="block font-medium text-darkGrayText text-sm mb-2">{label}</label>
            <div className="relative">
                <select
                    className={`block w-full p-2.5 border border-lightGrayBorder bg-lightGrayBackground rounded-md appearance-none pr-10 text-sm md:text-base ${isPending ? 'opacity-70' : ''}`}
                    value={currentValue}
                    onChange={handleChange}
                    disabled={isPending || isDisabled}
                >
                    <option value="all">{t("all")}</option>
                    {options.map((option) => (
                        <option key={option.id} value={option.attributes.title}>
                            {option.attributes.title}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                    {isPending ? (
                        <span className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                        <IconChevronDown className={`${isDisabled ? 'opacity-50' : ''}`} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default CareerFilterDropdown;