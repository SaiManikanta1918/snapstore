import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

const FeedPost = ({ post }) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);

  return (
    <>
      <PostHeader post={post} creatorProfile={userProfile} />
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image
          borderRadius={"2%"}
          height={{ base: "400px", sm: "450px" }}
          width={"100%"}
          src={post.imageURL}
          alt={"FEED POST IMG"}
          objectFit={"cover"}
        />
      </Box>
      <PostFooter post={post} creatorProfile={userProfile} />
    </>
  );
};

export default FeedPost;









