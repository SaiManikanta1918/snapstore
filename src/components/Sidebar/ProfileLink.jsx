import { Avatar, Box, Link } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const ProfileLink = () => {
  const { pathname} = useLocation()
  const isProfileTabActive = pathname.split('/').includes('user')
  const authUser = useAuthStore((state) => state.user);

  return (
    <Link
      display={"flex"}
      to={`/user/${authUser?.uid}`}
      as={RouterLink}
      alignItems={"center"}
      gap={4}
      bg={isProfileTabActive?'whiteAlpha.400':''}
      _hover={{ bg: "whiteAlpha.400" }}
      borderRadius={6}
      p={2}
      w={{ base: 10, md: "full" }}
      justifyContent={{ base: "center", md: "flex-start" }}
    >
      <Avatar
        size={"sm"}
        src={authUser?.profilePicURL || ""}
        name={authUser?.fullName}
      />
      <Box display={{ base: "none", md: "block" }} fontSize={"xl"}>
        Snapper
      </Box>
    </Link>
  );
};

export default ProfileLink;

