import { Box, Grid, Skeleton, Spinner, VStack } from '@chakra-ui/react';
import Post from './Post';
import NoPosts from './NoPosts';

const GridPosts = ({ isLoading, posts }) => {
  const noPostsFound = !isLoading && posts.length === 0;
  if (noPostsFound) return <NoPosts />;

  if (isLoading) {
    return (
      <Box textAlign="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <Grid
      templateColumns={{
        sm: 'repeat(1, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
      gap={10}
      columnGap={10}
    >
      {isLoading
        ? [0, 1, 2].map((_, idx) => (
            <VStack key={idx} alignItems={'flex-start'} gap={4}>
              <Skeleton w={'full'}>
                <Box h="300px">contents wrapped</Box>
              </Skeleton>
            </VStack>
          ))
        : posts.map((post) => <Post post={post} key={post.id} />)}
    </Grid>
  );
};

export default GridPosts;
