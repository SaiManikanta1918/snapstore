import { Flex } from "@chakra-ui/react";
import SidebarItems from "../Sidebar/SidebarItems";

const Bottombar = () => {
  return (
    <Flex
      display={{ base: "flex", md: "none" }}
      justifyContent={"space-around"}
      flexDirection={"row"}
      direction={"column"}
      gap={5}
      position={"sticky"}
      bottom={"0px"}
      background={"#000000ad"}
      p={"8px"}
      cursor={"pointer"}
    >
      <SidebarItems />
    </Flex>
  );
};

export default Bottombar;

