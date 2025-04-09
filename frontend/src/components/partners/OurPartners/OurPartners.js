"use client";
import Image from "next/image";
import { Sidebar, Section } from "@/components/scroll-layout";
import { getStrapiMedia } from "@/utils/api-helpers";
import { PageHeader } from "@/components/common";
import { useState, useCallback } from "react";
import { IconChevronDown } from "@/assets/images";

const Grid = ({ items }) => {
    if (items?.length === 0) return <div className="text-center text-gray-500 py-10">Stay tuned for more partners!</div>;
    return (
        <div className="grid grid-cols-3 gap-2 md:gap-3 md:grid-cols-4 py-5">
            {items?.map((item) => {
                const media = item.attributes?.media?.data;
                return (
                    <div
                        key={item.id}
                        className="rounded-md bg-white flex items-center md:py-4 md:px-6 mx-auto"
                    >
                        {media && (
                            <Image
                                src={getStrapiMedia(media.attributes.url)}
                                width={media.attributes.width}
                                height={media.attributes.height}
                                alt={
                                    media.attributes.alternativeText ||
                                    item.attributes.title ||
                                    `Partner ${item.id}`
                                }
                                className="w-full h-full min-w-[105px] object-contain"
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

const OurPartners = ({ pageHeader, locations, solutions }) => {
    const [selectedLocation, setSelectedLocation] = useState("");
    const [filteredSolutions, setFilteredSolutions] = useState(solutions?.data || []);

    const handleLocationChange = useCallback((e) => {
        const locationValue = e.target.value;
        setSelectedLocation(locationValue);

        if (!locationValue || locationValue === "") {
            setFilteredSolutions(solutions?.data || []);
        } else {
            const filtered = solutions?.data.map(solution => {
                return {
                    ...solution,
                    attributes: {
                        ...solution.attributes,
                        partners: {
                            data: solution.attributes.partners.data.filter(partner =>
                                partner.attributes?.locations?.data?.some(location =>
                                    location.attributes?.name === locationValue
                                )
                            )
                        }
                    }
                };
            }).filter(solution => solution.attributes.partners.data.length > 0);

            setFilteredSolutions(filtered);
        }
    }, [solutions]);

    const menuItem = solutions?.data?.map((solution) => solution.attributes.title);

    if (!solutions?.data?.length) return null;

    return (
        <section className="bg-white">
            <div className="md:ps-[60px] lg:ps-[86px]">
                {pageHeader && <div className="md:hidden"><PageHeader data={pageHeader} /></div>}
                <div className="flex flex-col md:flex-row">
                    <Sidebar
                        title="Solutions"
                        menuItem={menuItem}
                        Button={null}
                        description="Explore our partners by solution"
                    />
                    <div className="bg-lightGrayBackground md:w-[80%] 2xl:w-[85%]">
                        <div className="hidden md:block">
                            {pageHeader && <PageHeader data={pageHeader} />}
                        </div>
                        {locations?.data?.length > 0 &&
                            <div className="py-8 bg-white px-5 xl:px-0">
                                <div className="mx-auto md:max-w-[800px] 2xl:max-w-[1200px]">
                                    <label htmlFor="location" className="block font-medium text-darkGrayText text-sm mb-2">Location</label>
                                    <div className="relative">
                                        <select
                                            className="w-full p-2.5 border border-lightGrayBorder bg-lightGrayBackground rounded-md appearance-none pr-10"
                                            onChange={handleLocationChange}
                                            name="location"
                                            id="location"
                                            value={selectedLocation}
                                        >
                                            <option value="">All Locations</option>
                                            {locations?.data?.map((location) => (
                                                <option key={location?.id} value={location?.attributes?.name}>
                                                    {location?.attributes?.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                                            <IconChevronDown />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="ps-5 pe-5 md:ps-12 md:pe-[86px] py-8">
                            {filteredSolutions?.map((solution) => (
                                <Section
                                    key={solution.id}
                                    title={solution.attributes.title}
                                    subtitle={solution.attributes.description}
                                    id={solution.attributes.title}
                                    grid={<Grid items={solution.attributes.partners.data} />}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurPartners;