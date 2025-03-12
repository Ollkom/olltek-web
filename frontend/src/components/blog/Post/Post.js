import { postRenderer } from "@/utils/post-renderer";

export default function Post({ data, pageName }) {
  return (
    <article>
      {data?.attributes?.blocks?.map((section, index) =>
        postRenderer(section, index, pageName)
      )}
    </article>
  );
}
