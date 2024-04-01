import { Grid, Text } from '@chakra-ui/react';
import useGetFeedPosts from '../../hooks/useGetFeedPosts';
import { useEffect, useState } from 'react';
import Post from '../Profile/Post';
import { GridPostsSkeleton } from '../Loaders';

const ExplorePosts = ({ searchText }) => {
  const { isLoading, posts } = useGetFeedPosts();
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    setFilteredPosts(posts.filter((post) => post.caption.toLowerCase().includes(searchText)));
  }, [searchText, posts]);

  if (!isLoading && !posts.length) {
    return (
      <Text fontSize={'4xl'} color={'blue.300'}>
        No Posts found, please stop coding and start by creating posts.
      </Text>
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
      {isLoading ? (
        <GridPostsSkeleton />
      ) : (
        filteredPosts.map((post) => {
          return <Post key={post.id} post={post} />;
        })
      )}
    </Grid>
  );
};

export default ExplorePosts;
