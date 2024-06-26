import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import useGetUsers from '../../hooks/gethooks/useGetUsers';
import { Link } from 'react-router-dom';
import { PROFILE_STAT_TABS } from '../../constants';
import { SnapStoreLoader } from '../Loaders';

const FollowersList = ({ user }) => {
  const { isLoading, users } = useGetUsers(user.followers);

  if (isLoading) {
    return <SnapStoreLoader />;
  }
  return (
    <Flex flexDirection={'column'} gap={8}>
      {users.map((user) => (
        <Flex
          gap={2}
          key={user.id}
          justifyContent={'space-between'}
          alignItems={'center'}
          w={'full'}
        >
          <Flex alignItems={'center'} gap={2}>
            <Link to={`/user/${user.id}/posts`}>
              <Avatar src={user.profilePicURL} name={user.fullName} size={'md'} />
            </Link>
            <VStack spacing={1} alignItems={'flex-start'}>
              <Link to={`/user/${user.id}/posts`}>
                <Box fontSize={12} fontWeight={'bold'}>
                  {user.fullName}
                </Box>
              </Link>
              <Box fontSize={11} color={'gray.400'}>
                {user.username}
              </Box>
            </VStack>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

const FollowingList = ({ user }) => {
  const { isLoading, users } = useGetUsers(user.following);
  if (isLoading) {
    return <SnapStoreLoader />;
  }
  return (
    <Flex flexDirection={'column'} gap={8}>
      {users.map((user) => (
        <Flex
          gap={2}
          key={user.id}
          justifyContent={'space-between'}
          alignItems={'center'}
          w={'full'}
        >
          <Flex alignItems={'center'} gap={2}>
            <Link to={`/user/${user.id}/posts`}>
              <Avatar src={user.profilePicURL} name={user.fullName} size={'md'} />
            </Link>
            <VStack spacing={2} alignItems={'flex-start'}>
              <Link to={`/user/${user.id}/posts`}>
                <Box fontSize={12} fontWeight={'bold'}>
                  {user.fullName}
                </Box>
              </Link>
              <Box fontSize={11} color={'gray.500'}>
                {user.followers.length} followers
              </Box>
            </VStack>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

const ProfileStatsDrawer = ({ userProfile, isDrawerOpen, onClose, selectedProfileStat }) => {
  const tabIndex = PROFILE_STAT_TABS.findIndex((tab) => tab.name === selectedProfileStat);
  return (
    <Drawer onClose={onClose} isOpen={isDrawerOpen} size={{ base: 'xs', sm: 'sm' }}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{userProfile.username}</DrawerHeader>
        <DrawerBody p={0}>
          <Tabs defaultIndex={tabIndex} isLazy>
            <TabList justifyContent="space-around">
              <Tab>{PROFILE_STAT_TABS[0].label}</Tab>
              <Tab>{PROFILE_STAT_TABS[1].label}</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <FollowersList user={userProfile} />
              </TabPanel>
              <TabPanel>
                <FollowingList user={userProfile} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <Button bg={'blue.300'} variant="outline" mr={3} onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileStatsDrawer;
