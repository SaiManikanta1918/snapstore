import { Box, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import { useEffect, useState } from "react";
import Post from "../Profile/Post";

const ExplorePosts = ({ searchText }) => {
  const { isLoading, posts } = useGetFeedPosts();
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    setFilteredPosts(
      posts.filter((post) => post.caption.toLowerCase().includes(searchText))
    );
  }, [searchText, posts]);

  if (!isLoading && !posts.length) {
    return (
      <Text fontSize={"4xl"} color={"blue.300"}>
        No Posts found, please stop coding and start by creating posts.
      </Text>
    );
  }

  return (
    <Grid
      templateColumns={{
        sm: "repeat(1, 1fr)",
        md: "repeat(3, 1fr)",
      }}
      gap={10}
      columnGap={10}
    >
      {isLoading
        ? [...new Array(6)].map((_, idx) => (
            <VStack key={idx} alignItems={"flex-start"} gap={4}>
              <Skeleton w={"full"}>
                <Box h="300px">contents wrapped</Box>
              </Skeleton>
            </VStack>
          ))
        : filteredPosts.map((post) => {
            return <Post key={post.id} post={post} />;
          })}
    </Grid>
  );
};

export default ExplorePosts;

