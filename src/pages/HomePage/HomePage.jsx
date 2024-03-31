import { Box, Flex } from '@chakra-ui/react';
import FeedPosts from '../../components/FeedPosts/FeedPosts';
import SuggestedUsers from '../../components/SuggestedUsers/SuggestedUsers';

const HomePage = () => {
  return (
    <Box>
      <Flex>
        <Box flex={1} py={5} borderRight={'1px solid'} borderColor={'whiteAlpha.300'}>
          <FeedPosts />
        </Box>
        <Box flex={3} display={{ base: 'none', xl: 'block' }} maxW={'400px'}>
          <SuggestedUsers />
        </Box>
      </Flex>
    </Box>
  );
};

export default HomePage;
