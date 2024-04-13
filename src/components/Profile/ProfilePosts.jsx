import useGetUserPosts from '../../hooks/gethooks/useGetUserPosts';
import GridPosts from './GridPosts';

const ProfilePosts = () => {
  const { isLoading, posts } = useGetUserPosts();

  return <GridPosts isLoading={isLoading} posts={posts} />;
};

export default ProfilePosts;
