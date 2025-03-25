import { Pagination } from "@/components/common";
import { getCareers } from "@/utils/api-loaders";

const CareersTable = async ({ pageArticles, role, location, team, limit }) => {
    const careers = await getCareers(pageArticles, role, location, team, 0, limit);
    const totalPosts = careers?.meta?.pagination?.total;
    const currentItems = careers?.data?.length;

    return (
        <>
            <div className="overflow-x-auto border border-lightGrayBorder rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th scope="col" className="px-6 py-5 text-left text-sm md:text-lg font-medium text-darkGrayText">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-5 text-left text-sm md:text-lg font-medium text-darkGrayText">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-5 text-left text-sm md:text-lg font-medium text-darkGrayText">
                                Location
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 font-medium text-darkGrayText text-sm md:text-base">
                        {careers?.data?.length > 0 ? (
                            careers?.data?.map((career) => (
                                <tr key={career.id}>
                                    <td className="px-6 py-6">
                                        {career.attributes.role?.data?.attributes?.title || "N/A"}
                                    </td>
                                    <td className="px-6 py-6">
                                        {career.attributes.type || "N/A"}
                                    </td>
                                    <td className="px-6 py-6">
                                        {career.attributes.location?.data?.attributes?.title || "N/A"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-6 py-4 text-center">
                                    No careers found matching your criteria. Stay tuned for more opportunities!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 flex justify-center">
                <Pagination
                    totalItems={totalPosts}
                    currentItems={currentItems}
                    buttonText={"View all"}
                />
            </div>
        </>
    );
}

export default CareersTable;