import { Sidebar } from "@/components/scroll-layout";
import { PageHeader } from "@/components/common";
import cx from "classnames";
import { getTranslations } from "next-intl/server";

const LocationSection = ({ location, index }) => {
    const isEven = index % 2 === 0;

    const extractedGeolocation = location?.attributes?.geolocation?.split('src="')?.[1]?.split('"')?.[0] || ''
    const isExtractedGeolocationValid = extractedGeolocation.includes('https://www.google.com/maps/embed')
    return (
        <div className="flex flex-col md:flex-row items-center justify-center bg-white">
            <div className={cx("md:w-1/2", {
                "md:order-2": !isEven,
                "md:order-1": isEven
            })}>
                <div className="w-full md:h-64 2xl:h-80 bg-gray-200 overflow-hidden">
                    {isExtractedGeolocationValid && <iframe
                        src={extractedGeolocation}
                        className="h-[328px] md:h-[720px] w-full border-none border-0"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />}
                </div>
            </div>
            <div className={cx("md:w-1/2 flex justify-center items-center", {
                "md:order-1": !isEven,
                "md:order-2": isEven
            })}>
                <div className="bg-white max-w-[455px] ps-5 pe-5 py-5 md:py-0 md:ps-10 md:pe-5">
                    {location?.attributes?.name && <h2 className="text-xl 2xl:text-2xl font-medium mb-4 text-lightGrayText">{location?.attributes?.name}</h2>}
                    {location?.attributes?.description && <p className="font-normal text-sm 2xl:text-base text-lightGrayText">
                        {location?.attributes?.description}
                    </p>}
                </div>
            </div>
        </div>
    );
};

const OurLocations = async ({ data, pageHeader }) => {
    if (!data?.data || data?.data?.length === 0) return null;
    const t = await getTranslations("Global");
    const locations = data?.data;
    const menuItems = locations?.map(location => location?.attributes?.name);

    return (
        <section className="bg-white">
            <div className="md:ps-[60px] lg:ps-[86px]">
                {pageHeader && <div className="md:hidden"><PageHeader data={pageHeader} /></div>}
                <div className="flex flex-col md:flex-row">
                    <Sidebar
                        title={t("countries")}
                        menuItem={menuItems}
                        description={t("discoverOurGlobalPresenceAndLocalExpertiseInPaymentSolutions")}
                    />
                    <div className="bg-lightGrayBackground md:w-[80%] 2xl:w-[85%]">
                        <div className="hidden md:block">
                            {pageHeader && <PageHeader data={pageHeader} />}
                        </div>

                        <div className="ps-5 pe-5 md:ps-12 md:pe-[86px] py-8">
                            {locations?.map((location, index) => (
                                <div key={location.id} id={location.attributes.name}>
                                    <LocationSection location={location} index={index} />
                                    {index < locations.length - 1 && (
                                        <div className="h-[1px] bg-[#E5E5E7] my-5"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurLocations;