import { SectionHeader } from '@/components/common';
import { AllCareersSkeleton, CareerFilters, CareersTable } from '@/components/careers';
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';

const AllCareers = async ({ pageSlug, pageArticles, role, location, team, limit }) => {
    const t = await getTranslations("Global");
    return (
        <div className='py-12 md:py-24'>
            <div className='container mx-auto'>
                <SectionHeader
                    title={t("findYourNextOpportunity")}
                    description={t("shapeTheFutureOfCommerceWithUs")}
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