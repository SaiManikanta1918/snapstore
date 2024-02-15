import {
  Box,
  Flex,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { BsBookmark, BsGrid3X3, BsSuitHeart } from "react-icons/bs";
import ProfilePosts from "./ProfilePosts";
import LikedPosts from "./LikedPosts";
import SavedPosts from "./SavedPosts";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";

const ProfileTabs = () => {
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);
  console.log("userProfile", userProfile, authUser);
  const PostsTab = () => (
    <Flex alignItems={"center"} p="3" gap={4} cursor={"pointer"}>
      <Box fontSize={20}>
        <BsGrid3X3 />
      </Box>
      <Text fontSize={12} display={{ base: "none", sm: "block" }}>
        Posts
      </Text>
    </Flex>
  );
  const SavesTab = () => (
    <Flex alignItems={"center"} p="3" gap={4} cursor={"pointer"}>
      <Box fontSize={20}>
        <BsBookmark />
      </Box>
      <Text fontSize={12} display={{ base: "none", sm: "block" }}>
        Saved
      </Text>
    </Flex>
  );
  const LikesTab = () => (
    <Flex alignItems={"center"} p="3" gap={4} cursor={"pointer"}>
      <Box fontSize={20}>
        <BsSuitHeart fontWeight={"bold"} />
      </Box>
      <Text fontSize={12} display={{ base: "none", sm: "block" }}>
        Likes
      </Text>
    </Flex>
  );
  return !userProfile || !authUser ? (
    <Spinner />
  ) : (
    <Tabs variant="enclosed" defaultIndex={0}>
      <TabList>
        <Tab>
          <PostsTab />
        </Tab>
        {authUser?.uid === userProfile?.uid && (
          <Tab>
            <LikesTab />
          </Tab>
        )}
        {authUser?.uid === userProfile?.uid && (
          <Tab>
            <SavesTab />
          </Tab>
        )}
      </TabList>
      <TabPanels>
        <TabPanel>
          <ProfilePosts />
        </TabPanel>
        <TabPanel>
          <LikedPosts />
        </TabPanel>
        <TabPanel>
          <SavedPosts />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProfileTabs;





