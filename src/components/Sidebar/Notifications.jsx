import { Box, Flex } from '@chakra-ui/react';
import { NotificationsLogo } from '../../assets/constants';

const Notifications = () => {
  return (
    <Flex
      display={'flex'}
      alignItems={'center'}
      gap={4}
      _hover={{ bg: 'whiteAlpha.400' }}
      borderRadius={6}
      p={2}
      w={{ base: 10, md: 'full' }}
      justifyContent={{ base: 'center', md: 'flex-start' }}
    >
      <NotificationsLogo />
      <Box display={{ base: 'none', md: 'block' }} fontSize={'xl'}>
        Notifications
      </Box>
    </Flex>
  );
};

export default Notifications;
