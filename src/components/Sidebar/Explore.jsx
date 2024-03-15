import {
  Container,
  Flex,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import ExplorePeople from "../explore/ExplorePeople";
import ExplorePosts from "../explore/ExplorePosts";
import { useState } from "react";
import { SearchLogo } from "../../assets/constants";
import { useNavigate, useParams } from "react-router-dom";
import { EXPLORE_TABS } from "../../constants";

export const Explore = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const { selectedTab } = useParams();
  const tabIndex = EXPLORE_TABS.findIndex((tab) => tab.name === selectedTab);
  const [selectedTabIndex, setSelectedTabIndex] = useState(
    tabIndex > -1 ? tabIndex : 0
  );
  function onTabChage(index) {
    navigate(`/explore/${EXPLORE_TABS[index].name}`);
    setSelectedTabIndex(index);
  }

  const renderTextOnly = true;
  return renderTextOnly ? (
    <Text fontSize={"5xl"} color={"blue.500"}>
      This page is under construction
    </Text>
  ) : (
    <Container maxW="container.xl" py={{ base: 0, md: 10 }}>
      <Flex
        display={"flex"}
        alignItems={"center"}
        gap={4}
        bg={"whiteAlpha.400"}
        borderRadius={6}
        p={{ base: 0, md: 4 }}
        w={"full"}
        justifyContent={"flex-start"}
      >
        <SearchLogo />
        <Input
          variant="unstyled"
          placeholder="search"
          size={"lg"}
          onChange={(e) => setSearchText(e.target.value.toLowerCase())}
        />
      </Flex>
      <Flex my={4} w={"full"} mx={"auto"} flexDirection={"column"}>
        <Tabs
          defaultIndex={selectedTabIndex}
          onChange={(index) => onTabChage(index)}
          isLazy
        >
          <TabList justifyContent="space-around">
            <Tab>Posts</Tab>
            <Tab>People</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ExplorePosts searchText={searchText} />
            </TabPanel>
            <TabPanel>
              <ExplorePeople searchText={searchText} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Container>
  );
};

