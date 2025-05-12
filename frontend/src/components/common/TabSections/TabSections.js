import { Tabs, Tab } from "@/components/ui";
import { RichText } from "@/components/common";
import { EnhancedFeatures } from "@/components/subpage";
const TabSections = (props) => {
    const { data } = props;
    const { Tabs: tabs } = data;

    return (
        <section className="py-6">
            <div className="container px-5 md:px-0">
                <Tabs>
                    {tabs?.map((item) => {
                        const block1 = Array.isArray(item?.blocks) ? item?.blocks : item?.blocks?.content;
                        const features = Array.isArray(item?.features) ? item?.features : item?.features?.content;
                        const block2 = Array.isArray(item?.block2) ? item?.block2 : item?.block2?.content;
                        return (
                            <Tab label={item?.title} key={item?.id}>
                                {block1 && <RichText data={block1} />}
                                {features && <EnhancedFeatures data={{ feature: features, columns: "threeColumn" }} />}
                                {block2 && <RichText data={block2} />}
                            </Tab>
                        );
                    })}
                </Tabs>
            </div>
        </section>
    );
};

export default TabSections;
