import { BlockRendererClient } from "@/components/common";

export default function RichText({ data }) {
  const content = Array.isArray(data) ? data : data?.content;
  return (
    <section className="rich-text">
      <BlockRendererClient content={content} />
    </section>
  );
}
