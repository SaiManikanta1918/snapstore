import { Box, Flex, Spinner } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../components/Navbar/Navbar";
import Bottombar from "../../components/Bottombar/Bottombar";
import Topbar from "../../components/Topbar/Topbar";

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth);
  const canRenderSidebar = pathname !== "/auth" && user;
  const canRenderNavbar = !user && !loading && pathname !== "/auth";

  const checkingUserIsAuth = !user && loading;
  if (checkingUserIsAuth) return <PageLayoutSpinner />;

  return (
    <div className="flex" style={{ width: "100%", height: "inherit" }}>
      {user && <Topbar />}
      <section style={{ height: "inherit" }}>
        <Flex flexDir={canRenderNavbar ? "column" : "row"}>
          {canRenderSidebar ? (
            <Box
              w={{ base: "70px", md: "240px" }}
              display={{ base: "none", md: "block" }}
            >
              <Sidebar />
            </Box>
          ) : null}
          {/* Navbar */}
          {canRenderNavbar ? <Navbar /> : null}
          <Box
            flex={1}
            w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}
            mx={"auto"}
          >
            {children}
          </Box>
        </Flex>
      </section>
      {user && <Bottombar />}
    </div>
  );
};

export default PageLayout;

const PageLayoutSpinner = () => {
  return (
    <Flex
      flexDir="column"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner size="xl" />
    </Flex>
  );



};