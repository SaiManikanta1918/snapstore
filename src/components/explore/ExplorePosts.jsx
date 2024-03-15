import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { useEffect, useState } from "react";

const ExplorePosts = ({ searchText }) => {
  const { isLoading, posts } = useGetFeedPosts();
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    setFilteredPosts(
      posts.filter((post) => post.caption.toLowerCase().includes(searchText))
    );
  }, [searchText, posts]);

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
            return (
              <GridItem
                key={post.id}
                cursor={"pointer"}
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.500"}
                position={"relative"}
                aspectRatio={1 / 1}
              >
                <Flex
                  opacity={0}
                  _hover={{ opacity: 1 }}
                  position={"absolute"}
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bg={"blackAlpha.700"}
                  transition={"all 0.3s ease"}
                  zIndex={1}
                  justifyContent={"center"}
                >
                  <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={50}
                  >
                    <Flex>
                      <AiFillHeart size={20} />
                      <Text fontWeight={"bold"} ml={2}>
                        {post.likes.length}
                      </Text>
                    </Flex>

                    <Flex>
                      <FaComment size={20} />
                      <Text fontWeight={"bold"} ml={2}>
                        {post.comments.length}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>

                <Image
                  src={post.imageURL}
                  alt="profile post"
                  w={"100%"}
                  h={"100%"}
                  objectFit={"cover"}
                />
              </GridItem>
            );
          })}
    </Grid>
  );
};

export default ExplorePosts;

