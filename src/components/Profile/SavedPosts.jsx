import useGetSavedPosts from '../../hooks/useGetSavedPosts';
import GridPosts from './GridPosts';

const SavedPosts = () => {
  const { isLoading, savedPosts } = useGetSavedPosts();

  return <GridPosts isLoading={isLoading} posts={savedPosts} />;
};

export default SavedPosts;
