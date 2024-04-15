import { Container, Flex, Link, Text } from '@chakra-ui/react';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfileTabs from '../../components/Profile/ProfileTabs';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import useGetUserProfileByUserId from '../../hooks/gethooks/useGetUserProfileByUserId';
import { ProfileHeaderSkeleton } from '../../components/Loaders';

const ProfilePage = () => {
  const { userId } = useParams();
  const { isLoading, userProfile } = useGetUserProfileByUserId(userId);

  const userNotFound = !isLoading && !userProfile;
  if (userNotFound) return <UserNotFound />;

  return (
    <Container maxW="container.lg" py={{ base: 0, md: 5 }}>
      <Flex p={{ base: 0, md: 4 }} my={4} w={'full'} mx={'auto'} flexDirection={'column'}>
        {isLoading ? <ProfileHeaderSkeleton /> : userProfile && <ProfileHeader />}
      </Flex>
      <Flex px={{ base: 2, sm: 4 }} maxW={'full'} mx={'auto'}>
        <ProfileTabs />
      </Flex>
    </Container>
  );
};

export default ProfilePage;

const UserNotFound = () => {
  return (
    <Flex flexDir="column" textAlign={'center'} mx={'auto'}>
      <Text fontSize={'2xl'}>User Not Found</Text>
      <Link as={RouterLink} to={'/'} color={'blue.500'} w={'max-content'} mx={'auto'}>
        Go home
      </Link>
    </Flex>
  );
};
