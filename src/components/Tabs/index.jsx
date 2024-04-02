import { Box, Flex, Text } from '@chakra-ui/react';
import { BsSuitHeart, BsBookmark, BsGrid3X3 } from 'react-icons/bs';

export const SavesTab = () => (
  <Flex alignItems={'center'} p="3" gap={4} cursor={'pointer'}>
    <Box fontSize={20}>
      <BsBookmark />
    </Box>
    <Text fontSize={12} display={{ base: 'none', sm: 'block' }}>
      Saved
    </Text>
  </Flex>
);

export const LikesTab = () => (
  <Flex alignItems={'center'} p="3" gap={4} cursor={'pointer'}>
    <Box fontSize={20}>
      <BsSuitHeart fontWeight={'bold'} />
    </Box>
    <Text fontSize={12} display={{ base: 'none', sm: 'block' }}>
      Likes
    </Text>
  </Flex>
);

export const PostsTab = () => (
  <Flex alignItems={'center'} p="3" gap={4} cursor={'pointer'}>
    <Box fontSize={20}>
      <BsGrid3X3 />
    </Box>
    <Text fontSize={12} display={{ base: 'none', sm: 'block' }}>
      Posts
    </Text>
  </Flex>
);
