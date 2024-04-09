import { Box, Flex } from '@chakra-ui/react';
import FeedPosts from '../../components/FeedPosts/FeedPosts';
import SuggestedUsers from '../../components/SuggestedUsers/SuggestedUsers';

const HomePage = () => {
  return (
    <Box>
      <Flex>
        <Box flex={1} py={5}>
          <FeedPosts />
        </Box>
        <Box pr={20} flex={4} display={{ base: 'none', xl: 'block' }} maxW={'500px'}>
          <SuggestedUsers />
        </Box>
      </Flex>
    </Box>
  );
};

export default HomePage;
