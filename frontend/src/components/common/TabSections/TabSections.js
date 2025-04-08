import { Tabs, Tab } from "@/components/ui";
import { RichText } from "@/components/common";
const TabSections = (props) => {
    const { data } = props;
    const { Tabs: tabs } = data;

    return (
        <section className="py-6">
            <div className="container px-5 md:px-0">
                <Tabs>
                    {tabs?.map((item) => {
                        const content = Array.isArray(item?.blocks) ? item?.blocks : item?.blocks?.content;
                        return (
                            <Tab label={item?.title} key={item?.id}>
                                <RichText key={item?.id} data={content} />
                            </Tab>
                        );
                    })}
                </Tabs>
            </div>
        </section>
    );
};

export default TabSections;
