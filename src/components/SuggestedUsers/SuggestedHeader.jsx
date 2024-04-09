import { Avatar, Flex, Text } from '@chakra-ui/react';
import useAuthStore from '../../store/authStore';
import { Link } from 'react-router-dom';
import LogoutButton from '../Buttons/LogoutButton';

const SuggestedHeader = () => {
  const authUser = useAuthStore((state) => state.user);

  if (!authUser) return null;

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
      <Flex alignItems={'center'} gap={2}>
        <Link to={`/user/${authUser.uid}/posts`}>
          <Avatar size={'md'} src={authUser.profilePicURL} name={authUser.fullName} />
        </Link>
        <Link to={`/user/${authUser.uid}/posts`}>
          <Text fontSize={12} fontWeight={'bold'}>
            {authUser.username}
          </Text>
        </Link>
      </Flex>
      <LogoutButton />
    </Flex>
  );
};

export default SuggestedHeader;
