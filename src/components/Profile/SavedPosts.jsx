import { Box, Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost";
import useGetSavedPosts from "../../hooks/useGetSavedPosts";

const SavedPosts = () => {
  const { isLoading, savedPosts } = useGetSavedPosts();

  const noPostsFound = !isLoading && savedPosts.length === 0;
  if (noPostsFound) return <NoPostsFound />;

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
        sm: "repeat(1, 1fr)",
        md: "repeat(3, 1fr)",
      }}
      gap={10}
      columnGap={10}
    >
      {/* {isLoading &&
        [0, 1, 2].map((_, idx) => (
          <VStack key={idx} alignItems={"flex-start"} gap={4}>
            <Skeleton w={"full"}>
              <Box h="300px">contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))} */}

      {savedPosts.map((post) => (
        <ProfilePost post={post} key={post.id} />
      ))}
    </Grid>
  );
};

export default SavedPosts;

const NoPostsFound = () => {
  return (
    <Flex flexDir="column" textAlign={"center"} mx={"auto"} mt={10}>
      <Text fontSize={"2xl"}>No Posts Found🤔</Text>
    </Flex>
  );
};

