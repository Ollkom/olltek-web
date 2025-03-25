import { SectionHeader } from '@/components/common';
import { AllCareersSkeleton, CareerFilters, CareersTable } from '@/components/careers';
import { Suspense } from 'react';

const AllCareers = async ({ pageSlug, pageArticles, role, location, team, limit }) => {

    return (
        <div className='py-12 md:py-24'>
            <div className='container mx-auto'>
                <SectionHeader
                    title="Find Your Next Opportunity"
                    description="Shape the Future of Commerce with Us."
                />
                {/* Filters */}

                <CareerFilters
                    activeRole={role}
                    activeLocation={location}
                    activeTeam={team}
                />

                <Suspense fallback={<AllCareersSkeleton />}>
                    <CareersTable
                        key={`${role}-${location}-${team}-${limit}`}
                        pageArticles={pageArticles}
                        role={role}
                        location={location}
                        team={team}
                        limit={limit}
                    />
                </Suspense>

            </div>
        </div>
    )
}

export default AllCareers