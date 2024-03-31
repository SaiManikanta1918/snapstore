import useGetUserPosts from '../../hooks/useGetUserPosts';
import GridPosts from './GridPosts';

const ProfilePosts = () => {
  const { isLoading, posts } = useGetUserPosts();

  return <GridPosts isLoading={isLoading} posts={posts} />;
};

export default ProfilePosts;
