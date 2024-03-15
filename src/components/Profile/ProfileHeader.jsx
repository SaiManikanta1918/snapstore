import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import EditProfile from "./EditProfile";
import useFollowUser from "../../hooks/useFollowUser";
import ProfileStatsDrawer from "./ProfileStatsDrawer";

const ProfileHeader = () => {
  const { userProfile } = useUserProfileStore();
  const authUser = useAuthStore((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(
    userProfile?.uid
  );
  const visitingOwnProfileAndAuth =
    authUser && authUser.username === userProfile.username;
  const visitingAnotherProfileAndAuth =
    authUser && authUser.username !== userProfile.username;

  return (
    <>
      <Flex gap={{ base: 4, sm: 10 }} direction={{ base: "column", sm: "row" }}>
        <AvatarGroup
          size={{ base: "xl", md: "2xl" }}
          justifySelf={"center"}
          alignSelf={"flex-start"}
          mx={"auto"}
        >
          <Avatar src={userProfile.profilePicURL} name={userProfile.fullName} />
        </AvatarGroup>
        <VStack
          alignItems={{ base: "center", md: "start" }}
          gap={2}
          mx={"auto"}
          flex={1}
        >
          <Flex
            direction="column"
            alignItems={{ base: "center", md: "start" }}
            justifyContent={{ base: "center", sm: "flex-start" }}
            w={"full"}
          >
            <Text fontSize={{ base: "2xl", md: "5xl" }}>
              {userProfile.fullName}
            </Text>
            <Text
              fontSize={"xl"}
              fontWeight={"bold"}
              textColor={"whiteAlpha.600"}
            >
              @{userProfile.username}
            </Text>
          </Flex>
          <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
            <Text
              p={2}
              borderRadius={6}
              fontSize={{ base: "xs", md: "sm" }}
              cursor="pointer"
            >
              <Text as="span" fontWeight={"bold"} mr={1}>
                {userProfile.posts.length}
              </Text>
              Posts
            </Text>
            <Text
              p={2}
              borderRadius={6}
              fontSize={{ base: "xs", md: "sm" }}
              cursor="pointer"
              _hover={{ bg: "whiteAlpha.400" }}
              onClick={onDrawerOpen}
            >
              <Text as="span" fontWeight={"bold"} mr={1}>
                {userProfile.followers.length} Followers
              </Text>
            </Text>
            <Text
              p={2}
              borderRadius={6}
              fontSize={{ base: "xs", md: "sm" }}
              cursor="pointer"
              _hover={{ bg: "whiteAlpha.400" }}
              onClick={onDrawerOpen}
            >
              <Text as="span" fontWeight={"bold"} mr={1}>
                {userProfile.following.length} Following
              </Text>
            </Text>
          </Flex>
          {/* <Flex alignItems={"center"} gap={4}>
            <Text fontSize={"sm"}>{userProfile.bio}</Text>
          </Flex> */}
        </VStack>
        {visitingOwnProfileAndAuth && (
          <Flex gap={4} justifyContent={"center"}>
            <Button
              bg={"blue.300"}
              color={"black"}
              _hover={{ bg: "blue.200" }}
              size={{ base: "sm", md: "md" }}
              onClick={onOpen}
            >
              Edit Profile
            </Button>
          </Flex>
        )}
        {visitingAnotherProfileAndAuth && (
          <Flex gap={4} justifyContent={"center"}>
            <Button
              bg={"blue.500"}
              color={"white"}
              _hover={{ bg: "blue.600" }}
              size={{ base: "xs", md: "sm" }}
              onClick={handleFollowUser}
              isLoading={isUpdating}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          </Flex>
        )}
        {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
      </Flex>
      {isDrawerOpen && (
        <ProfileStatsDrawer
          userProfile={userProfile}
          isDrawerOpen={isDrawerOpen}
          onClose={onDrawerClose}
        />
      )}
    </>
  );
};

export default ProfileHeader;

