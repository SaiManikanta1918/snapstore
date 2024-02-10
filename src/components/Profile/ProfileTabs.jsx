import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { BsBookmark, BsGrid3X3, BsSuitHeart } from "react-icons/bs";
import ProfilePosts from "./ProfilePosts";

const ProfileTabs = () => {
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
  return (
    <Tabs variant="enclosed" defaultIndex={1}>
      <TabList>
        <Tab>
          <PostsTab />
        </Tab>
        <Tab>
          <SavesTab />
        </Tab>
        <Tab>
          <LikesTab />
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ProfilePosts />
        </TabPanel>
        <TabPanel>Tab2</TabPanel>
        <TabPanel>Tab3</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProfileTabs;

