import { Flex } from "@chakra-ui/react";
import SidebarItems from "../Sidebar/SidebarItems";

const Bottombar = () => {
  return (
    <section
      style={{
        position: "sticky",
        bottom: "0px",
        background: "#000000ad",
      }}
    >
      <Flex
        display={{ base: "flex", md: "none" }}
        justifyContent={"space-around"}
        flexDirection={"row"}
        direction={"column"}
        gap={5}
        cursor={"pointer"}
      >
        <SidebarItems />
      </Flex>
    </section>
  );
};

export default Bottombar;

