import { Box, Flex } from "@chakra-ui/react";
import FeedPosts from "../../components/FeedPosts/FeedPosts";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";

const HomePage = () => {
  return (
    <Box>
      <Flex gap={20}>
        <Box
          flex={1}
          py={5}
          borderRight={"1px solid"}
          borderColor={"whiteAlpha.300"}
        >
          <FeedPosts />
        </Box>
        <Box flex={3} display={{ base: "none", lg: "block" }} maxW={"300px"}>
          <SuggestedUsers />
        </Box>
      </Flex>
    </Box>
  );
};

export default HomePage;

