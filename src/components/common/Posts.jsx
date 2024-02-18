import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import FeedPosts from "../FeedPosts/FeedPosts";
import { useEffect } from "react";

const Posts = ({ posts, isLoading, noPostsMessage }) => {
  useEffect(() => {}, [isLoading]);
  return (
    <Container maxW={"container.sm"} px={{ base: 5, md: 0 }}>
      {isLoading &&
        [0, 1, 2].map((_, idx) => (
          <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
            <Flex gap="2">
              <SkeletonCircle size="10" />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton height="10px" w={"200px"} />
                <Skeleton height="10px" w={"200px"} />
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"400px"}>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading && posts.length > 0 ? (
        posts.map((post) => <FeedPosts key={post.id} post={post} />)
      ) : (
        <Text fontSize={"md"} color={"white.400"}>
          {noPostsMessage}
        </Text>
      )}
    </Container>
  );
};

export default Posts;

