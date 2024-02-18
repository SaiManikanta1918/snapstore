import { Box, Link } from "@chakra-ui/react";
import Home from "./Home";
import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import Search from "./Search";
import { CreatePostLogo } from "../../assets/constants";
import { Link as RouterLink } from "react-router-dom";

const SidebarItems = () => {
  return (
    <>
      <Home />
      <Search />
      <Notifications />
      <Link
        display={"flex"}
        to={"/create-post"}
        as={RouterLink}
        alignItems={"center"}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        <CreatePostLogo />
        <Box display={{ base: "none", md: "block" }}>Create</Box>
      </Link>
      <ProfileLink display={{ base: "none", md: "flex" }} />
    </>
  );
};

export default SidebarItems;

