import { Avatar, Box, Button, Flex, VStack } from '@chakra-ui/react';
import useFollowUser from '../../hooks/useFollowUser';
import { Link } from 'react-router-dom';

const SuggestedUser = ({ user }) => {
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.id);

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
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
      <Button
        fontSize={13}
        p={0}
        color={'blue.300'}
        cursor={'pointer'}
        _hover={{ color: 'blue.200' }}
        onClick={handleFollowUser}
        isLoading={isUpdating}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
    </Flex>
  );
};

export default SuggestedUser;
