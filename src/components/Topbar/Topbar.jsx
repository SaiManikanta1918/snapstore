import { Flex, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { LogOutIcon } from '../Buttons/LogoutButton';

const Topbar = () => {
  return (
    <Flex
      display={{ base: 'flex', md: 'none' }}
      justifyContent={'space-between'}
      flexDirection={'row'}
      alignItems={'center'}
      direction={'column'}
      gap={5}
      cursor={'pointer'}
      position={'sticky'}
      top={'0px'}
      background={'#000000ad'}
      padding={'12px'}
      width={'100%'}
    >
      <Link
        to={'/'}
        as={RouterLink}
        className="flex gap-3 items-center"
        color={'blue.300'}
        fontWeight={'bold'}
        textDecoration={'none'}
        _hover={{ textDecoration: 'none' }}
      >
        SnapStore
      </Link>
      <LogOutIcon />
    </Flex>
  );
};

export default Topbar;
