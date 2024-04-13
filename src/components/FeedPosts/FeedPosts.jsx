import { Container, Text } from '@chakra-ui/react';
import FeedPost from './FeedPost';
import useGetFeedPosts from '../../hooks/gethooks/useGetFeedPosts';
import { FeedPostsSkeleton } from '../Loaders';

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts();

  if (!isLoading && !posts.length) {
    return (
      <Text fontSize={'md'} color={'white.400'}>
        No Posts found, please stop coding and start by creating posts.
      </Text>
    );
  }

  return (
    <Container maxW={'container.md'} px={{ base: 5, md: 2 }}>
      {isLoading ? (
        <FeedPostsSkeleton />
      ) : (
        posts.map((post) => <FeedPost key={post.id} post={post} />)
      )}
    </Container>
  );
};

export default FeedPosts;
