import { Container, Text } from '@chakra-ui/react';
import FeedPosts from '../FeedPosts/FeedPosts';
import { useEffect } from 'react';
import { PostsSkeleton } from '../Loaders';

const Posts = ({ posts, isLoading, noPostsMessage }) => {
  useEffect(() => {}, [isLoading]);
  return (
    <Container maxW={'container.sm'} px={{ base: 5, md: 0 }}>
      {isLoading ? (
        <PostsSkeleton />
      ) : posts.length > 0 ? (
        posts.map((post) => <FeedPosts key={post.id} post={post} />)
      ) : (
        <Text fontSize={'md'} color={'white.400'}>
          {noPostsMessage}
        </Text>
      )}
    </Container>
  );
};

export default Posts;
