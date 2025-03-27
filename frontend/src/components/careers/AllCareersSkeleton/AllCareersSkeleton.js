const AllCareersSkeleton = () => {
    // Generate 5 skeleton rows for the table
    return (
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
                <tbody className="divide-y divide-gray-200">
                    {Array(5).fill(0).map((_, index) => (
                        <tr key={index}>
                            <td className="px-6 py-6">
                                <div className="h-4 md:h-5 w-3/4 bg-neutral-100 dark:bg-neutral-200 animate-pulse rounded" />
                            </td>
                            <td className="px-6 py-6">
                                <div className="h-4 md:h-5 w-1/2 bg-neutral-100 dark:bg-neutral-200 animate-pulse rounded" />
                            </td>
                            <td className="px-6 py-6">
                                <div className="h-4 md:h-5 w-2/3 bg-neutral-100 dark:bg-neutral-200 animate-pulse rounded" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllCareersSkeleton;