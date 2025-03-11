import { EnhancedCard } from "@/components/ui";

function PostCard({ card }) {
  const { title, description, slug, cover, publishedAt } = card?.attributes || {};
  return (
    <EnhancedCard
      url={`/blog/${slug}`}
      title={title}
      description={description}
      media={cover?.data?.attributes}
      publishedAt={publishedAt}
    />
  );
}

export default PostCard;
