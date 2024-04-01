import { Grid } from '@chakra-ui/react';
import Post from './Post';
import NoPosts from './NoPosts';
import { GridPostsSkeleton } from '../Loaders';

const GridPosts = ({ isLoading, posts }) => {
  if (!isLoading && !posts.length) return <NoPosts />;

  return (
    <Grid
      templateColumns={{
        sm: 'repeat(1, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
      gap={10}
      columnGap={10}
    >
      {isLoading ? <GridPostsSkeleton /> : posts.map((post) => <Post post={post} key={post.id} />)}
    </Grid>
  );
};

export default GridPosts;
