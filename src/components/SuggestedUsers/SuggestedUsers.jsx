import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";

const SuggestedUsers = () => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();

  // optional: render loading skeleton
  if (isLoading) return null;

  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />

      {suggestedUsers.length !== 0 && (
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
          <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
            Snappies for you
          </Text>
          {/* <Text
            fontSize={12}
            fontWeight={"bold"}
            _hover={{ color: "gray.400" }}
            cursor={"pointer"}
          >
            See All
          </Text> */}
        </Flex>
      )}

      {suggestedUsers.map((user) => (
        <SuggestedUser user={user} key={user.id} />
      ))}

      <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
        © 2023 Built By{" "}
        <Link
          href="https://www.linkedin.com/in/sai-manikanta-karnati-9a62601b1"
          target="_blank"
          color="blue.300"
          fontSize={14}
        >
          Sai Manikanta
        </Link>
      </Box>
    </VStack>
  );
};

export default SuggestedUsers;