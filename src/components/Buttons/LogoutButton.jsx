import { Button } from '@chakra-ui/react';
import useLogout from '../../hooks/useLogout';
import { Flex, Tooltip } from '@chakra-ui/react';
import { BiLogOut } from 'react-icons/bi';

const LogoutButton = () => {
  const { handleLogout, isLoggingOut } = useLogout();

  return (
    <Button
      p={0}
      background={'transparent'}
      _hover={{ background: 'transparent' }}
      fontSize={14}
      fontWeight={'medium'}
      color={'blue.300'}
      onClick={handleLogout}
      isLoading={isLoggingOut}
      cursor={'pointer'}
    >
      Log out
    </Button>
  );
};

export const SidebarLogoutButton = () => {
  const { handleLogout, isLoggingOut } = useLogout();

  return (
    <Tooltip hasArrow label={'Logout'} placement="right" ml={1} openDelay={500}>
      <Flex
        onClick={handleLogout}
        alignItems={'center'}
        gap={4}
        _hover={{ bg: 'whiteAlpha.400' }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: 'full' }}
        mt={'auto'}
        justifyContent={{ base: 'center', md: 'flex-start' }}
      >
        <BiLogOut size={25} />
        <Button
          display={{ base: 'none', md: 'block' }}
          variant={'ghost'}
          _hover={{ bg: 'transparent' }}
          isLoading={isLoggingOut}
        >
          Logout
        </Button>
      </Flex>
    </Tooltip>
  );
};

export const LogOutIcon = () => {
  const { handleLogout } = useLogout();

  return <BiLogOut size={25} onClick={handleLogout} />;
};

export default LogoutButton;
