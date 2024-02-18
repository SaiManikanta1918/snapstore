import { Box, Flex, Link } from "@chakra-ui/react";
import useLogout from "../../hooks/useLogout";
import { BiLogOut } from "react-icons/bi";

const Topbar = () => {
  const { handleLogout } = useLogout();

  return (
    <Box display={{ base: "flex", sm: "none" }}>
      <section
        style={{
          position: "sticky",
          top: "0px",
          background: "#000000ad",
          padding: "12px",
          width: "100%",
        }}
      >
        <Flex
          display={{ base: "flex", md: "none" }}
          justifyContent={"space-between"}
          flexDirection={"row"}
          alignItems={"center"}
          direction={"column"}
          gap={5}
          cursor={"pointer"}
        >
          <Link to="/" className="flex gap-3 items-center">
            SnapStore
          </Link>
          <BiLogOut size={25} onClick={handleLogout} />
        </Flex>
      </section>
    </Box>
  );
};

export default Topbar;

