import { Box, Link } from '@chakra-ui/react';
import ProfileLink from './ProfileLink';
import { CreatePostLogo, NotificationsLogo, SearchLogo } from '../../assets/constants';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { SIDEBAR_TABS } from '../../constants';
import React from 'react';
import { AiOutlineHome, AiOutlineWechat } from 'react-icons/ai';

const Components = {
  home: AiOutlineHome,
  search: SearchLogo,
  notifications: NotificationsLogo,
  create: CreatePostLogo,
  explore: SearchLogo,
  chat: AiOutlineWechat,
};

const SidebarItems = () => {
  const { pathname } = useLocation();

  return (
    <>
      {SIDEBAR_TABS.map((link) => (
        <Link
          key={link.name}
          display={'flex'}
          to={link.route}
          as={RouterLink}
          alignItems={'center'}
          gap={4}
          bg={pathname.startsWith(link.route) ? 'whiteAlpha.400' : ''}
          _hover={{ bg: 'whiteAlpha.400' }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: 'full' }}
          justifyContent={{ base: 'center', md: 'flex-start' }}
        >
          {React.createElement(Components[link.name], { size: 25 })}
          <Box display={{ base: 'none', md: 'block' }} fontSize={'xl'}>
            {link.label}
          </Box>
        </Link>
      ))}
      <ProfileLink display={'flex'} />
    </>
  );
};

export default SidebarItems;
