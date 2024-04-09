import { Box, Flex, Link } from '@chakra-ui/react';
import SidebarItems from './SidebarItems';
import { SidebarLogoutButton } from '../Buttons/LogoutButton';

const Sidebar = () => {
  return (
    <Box
      height={'100vh'}
      borderRight={'1px solid'}
      borderColor={'whiteAlpha.500'}
      py={8}
      position={'sticky'}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction={'column'} gap={10} w="full" height={'full'}>
        <Link to="/" className="flex gap-3 items-center">
          <img src="/snapstore.png" alt="logo" width={100} />
        </Link>
        <Flex direction={'column'} gap={5} cursor={'pointer'}>
          <SidebarItems />
        </Flex>
        <SidebarLogoutButton />
      </Flex>
    </Box>
  );
};

export default Sidebar;
