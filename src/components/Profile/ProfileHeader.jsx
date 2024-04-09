import { Avatar, AvatarGroup, Button, Flex, Text, VStack, useDisclosure } from '@chakra-ui/react';
import useUserProfileStore from '../../store/userProfileStore';
import useAuthStore from '../../store/authStore';
import EditProfile from './EditProfile';
import useFollowUser from '../../hooks/useFollowUser';
import ProfileStatsDrawer from './ProfileStatsDrawer';
import { useState } from 'react';
import { PROFILE_STAT_TABS } from '../../constants';
import { EditIcon } from '@chakra-ui/icons';
import SettingsButton from '../Buttons/SettingsButton';

const ProfileHeader = () => {
  const [selectedProfileStat, setSelectedProfileStat] = useState(null);
  const authUser = useAuthStore((state) => state.user);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.id);
  const visitingOwnProfileAndAuth = authUser && authUser.uid === userProfile.id;
  const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;

  function showFollowersList() {
    setSelectedProfileStat(PROFILE_STAT_TABS[0].name);
    onDrawerOpen();
  }

  function showFollowingList() {
    setSelectedProfileStat(PROFILE_STAT_TABS[1].name);
    onDrawerOpen();
  }

  return (
    <>
      <Flex gap={{ base: 4, sm: 10 }} direction={{ base: 'column', sm: 'row' }}>
        <Flex gap={{ md: 10 }}>
          <AvatarGroup
            size={{ base: 'xl', md: '2xl' }}
            justifySelf={'center'}
            alignSelf={'flex-start'}
            mx={'auto'}
          >
            <Avatar src={userProfile.profilePicURL} name={userProfile.fullName} />
          </AvatarGroup>
          <VStack alignItems={{ base: 'center', md: 'start' }} gap={2} mx={'auto'} flex={1}>
            <Flex
              direction="column"
              alignItems={{ base: 'center', md: 'start' }}
              justifyContent={{ base: 'center', sm: 'flex-start' }}
              w={'full'}
              mt={'-10px'}
            >
              <Text fontSize={{ base: '2xl', md: '4xl' }}>{userProfile.fullName}</Text>
              <Text
                fontSize={{ base: 'md', md: 'xl' }}
                fontWeight={'bold'}
                textColor={'whiteAlpha.600'}
              >
                @{userProfile.username}
              </Text>
            </Flex>
            <Flex alignItems={'center'} gap={{ base: 2, sm: 4 }}>
              <Text p={2} borderRadius={6} fontSize={{ base: 'xs', md: 'sm' }}>
                <Text as="span" fontWeight={'bold'} mr={1}>
                  {userProfile.posts.length} Posts
                </Text>
              </Text>
              <Text
                p={2}
                borderRadius={6}
                fontSize={{ base: 'xs', md: 'sm' }}
                cursor="pointer"
                _hover={{ bg: 'whiteAlpha.400' }}
                onClick={showFollowersList}
              >
                <Text as="span" fontWeight={'bold'} mr={1}>
                  {`${userProfile.followers.length} ${PROFILE_STAT_TABS[0].label}`}
                </Text>
              </Text>
              <Text
                p={2}
                borderRadius={6}
                fontSize={{ base: 'xs', md: 'sm' }}
                cursor="pointer"
                _hover={{ bg: 'whiteAlpha.400' }}
                onClick={showFollowingList}
              >
                <Text as="span" fontWeight={'bold'} mr={1}>
                  {`${userProfile.following.length} ${PROFILE_STAT_TABS[1].label}`}
                </Text>
              </Text>
            </Flex>
          </VStack>
        </Flex>
        {visitingOwnProfileAndAuth && (
          <Flex gap={4} justifyContent={'center'} alignItems={'start'}>
            <SettingsButton />
            <Button
              leftIcon={<EditIcon />}
              bg={'blue.300'}
              color={'black'}
              size={{ base: 'xs', md: 'md' }}
              _hover={{ bg: 'blue.200' }}
              onClick={onOpen}
            >
              Edit Profile
            </Button>
          </Flex>
        )}
        {visitingAnotherProfileAndAuth && (
          <Flex gap={4} justifyContent={'center'}>
            <Button
              bg={'blue.300'}
              color={'black'}
              _hover={{ bg: 'blue.200' }}
              size={{ base: 'xs', md: 'md' }}
              onClick={handleFollowUser}
              isLoading={isUpdating}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
            {authUser.uid !== userProfile.id &&
              (!userProfile.isPrivate || authUser.following.includes(userProfile.id)) && (
                <Button
                  bg={'blue.300'}
                  color={'black'}
                  _hover={{ bg: 'blue.200' }}
                  size={{ base: 'xs', md: 'md' }}
                >
                  Message
                </Button>
              )}
          </Flex>
        )}
      </Flex>
      {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
      {isDrawerOpen && (
        <ProfileStatsDrawer
          userProfile={userProfile}
          isDrawerOpen={isDrawerOpen}
          selectedProfileStat={selectedProfileStat}
          onClose={onDrawerClose}
        />
      )}
    </>
  );
};

export default ProfileHeader;
