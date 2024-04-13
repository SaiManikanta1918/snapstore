import { Flex, Spinner, Text, VStack } from '@chakra-ui/react';
import SuggestedHeader from './SuggestedHeader';
import SuggestedUser from './SuggestedUser';
import useGetSuggestedUsers from '../../hooks/gethooks/useGetSuggestedUsers';

const SuggestedUsers = () => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();

  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />
      <Flex alignItems={'center'} justifyContent={'space-between'} w={'full'}>
        <Text fontSize={12} fontWeight={'bold'} color={'gray.500'}>
          Snappies for you
        </Text>
      </Flex>

      {isLoading ? (
        <Spinner size={'lg'} />
      ) : (
        suggestedUsers.map((user) => <SuggestedUser user={user} key={user.id} />)
      )}

      {/* <Box fontSize={12} color={'gray.500'} mt={5} alignSelf={'start'}>
        © 2024 Built By{' '}
        <Link
          href="https://www.linkedin.com/in/sai-manikanta-karnati-9a62601b1"
          target="_blank"
          color="blue.300"
          fontSize={14}
        >
          Sai Manikanta
        </Link>
      </Box> */}
    </VStack>
  );
};

export default SuggestedUsers;
