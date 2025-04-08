import { getCareerFields } from "@/utils/api-loaders";
import { CareerFilterDropdown } from "@/components/careers";

async function CareerFilters({ activeRole, activeLocation, activeTeam }) {
    const [roles, locations, teams] = await Promise.all([
        getCareerFields("/career-roles"),
        getCareerFields("/career-locations"),
        getCareerFields("/career-teams"),
    ]);

    if (!roles?.data?.length && !locations?.data?.length && !teams?.data?.length) return null;

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 md:mb-20 md:max-w-7xl mx-auto">
                <CareerFilterDropdown
                    label="Role"
                    options={roles?.data || []}
                    activeValue={activeRole}
                    paramName="role"
                />
                <CareerFilterDropdown
                    label="Team"
                    options={teams?.data || []}
                    activeValue={activeTeam}
                    paramName="team"
                />
                <CareerFilterDropdown
                    label="Location"
                    options={locations?.data || []}
                    activeValue={activeLocation}
                    paramName="location"
                />
            </div>
        </div>
    );
}

export default CareerFilters;