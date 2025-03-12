import { PostCard } from "@/components/blog";

const PostGrid = ({ pageSlug, posts }) => (
  <>
    {posts?.map((card) => (
      <PostCard card={card} key={card?.id} pageSlug={pageSlug} />
    ))}
  </>
);

export default PostGrid;
