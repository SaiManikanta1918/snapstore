import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import useGetUsers from "../../hooks/useGetUsers";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const FollowersList = ({ user }) => {
  const { isLoading, users } = useGetUsers(user.followers);
  const authUser = useAuthStore((state) => state.user);
  console.log("authUser", authUser);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Flex flexDirection={"column"} gap={8}>
      {users.map((user) => (
        <Flex
          gap={2}
          key={user.uid}
          justifyContent={"space-between"}
          alignItems={"center"}
          w={"full"}
        >
          <Flex alignItems={"center"} gap={2}>
            <Link to={`/user/${user.uid}`}>
              <Avatar
                src={user.profilePicURL}
                name={user.fullName}
                size={"md"}
              />
            </Link>
            <VStack spacing={1} alignItems={"flex-start"}>
              <Link to={`/user/${user.uid}`}>
                <Box fontSize={12} fontWeight={"bold"}>
                  {user.fullName}
                </Box>
              </Link>
              <Box fontSize={11} color={"gray.400"}>
                {user.username}
              </Box>
            </VStack>
          </Flex>
          {/* {authUser.uid === user.uid && (
            <Button
              fontSize={13}
              bg={"transparent"}
              p={0}
              h={"max-content"}
              fontWeight={"medium"}
              color={"blue.300"}
              cursor={"pointer"}
              _hover={{ color: "white" }}
            >
              {authUser.followers.includes(user.uid) ? "Unfollow" : "Follow"}
            </Button>
          )} */}
        </Flex>
      ))}
    </Flex>
  );
};

const FollowingList = ({ user }) => {
  const { isLoading, users } = useGetUsers(user.following);
  const authUser = useAuthStore((state) => state.user);

  if (isLoading) {
    return <Spinner />;
  }
  return users.map((user) => (
    <Flex
      key={user.uid}
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"full"}
    >
      <Flex alignItems={"center"} gap={2}>
        <Link to={`/user/${user.uid}`}>
          <Avatar src={user.profilePicURL} name={user.fullName} size={"md"} />
        </Link>
        <VStack spacing={2} alignItems={"flex-start"}>
          <Link to={`/user/${user.uid}`}>
            <Box fontSize={12} fontWeight={"bold"}>
              {user.fullName}
            </Box>
          </Link>
          <Box fontSize={11} color={"gray.500"}>
            {user.followers.length} followers
          </Box>
        </VStack>
      </Flex>
      {authUser.uid !== user.uid && (
        <Button
          fontSize={13}
          bg={"transparent"}
          p={0}
          h={"max-content"}
          fontWeight={"medium"}
          color={"blue.300"}
          cursor={"pointer"}
          _hover={{ color: "white" }}
        >
          {authUser.following.includes(user.uid) ? "Unfollow" : "Follow"}
        </Button>
      )}
    </Flex>
  ));
};

const ProfileStatsDrawer = ({ userProfile, isDrawerOpen, onClose }) => {
  return (
    <Drawer
      onClose={onClose}
      isOpen={isDrawerOpen}
      size={{ base: "xs", sm: "sm" }}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{userProfile.username}</DrawerHeader>
        <DrawerBody p={0}>
          <Tabs defaultIndex={0} isLazy>
            <TabList justifyContent="space-around">
              <Tab>Followers</Tab>
              <Tab>Following</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <FollowersList user={userProfile} />
              </TabPanel>
              <TabPanel>
                <FollowingList user={userProfile} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <Button bg={"blue.300"} variant="outline" mr={3} onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default ProfileStatsDrawer;

