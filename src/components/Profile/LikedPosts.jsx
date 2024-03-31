import useGetLikedPosts from "../../hooks/useGetLikedPosts";
import GridPosts from "./GridPosts";

const LikedPosts = () => {
  const { isLoading, likedPosts } = useGetLikedPosts();

  return <GridPosts isLoading={isLoading} posts={likedPosts} />;
};

export default LikedPosts;

