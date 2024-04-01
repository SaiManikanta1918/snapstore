import { Avatar, Box, Button, Flex, VStack } from '@chakra-ui/react';
import useFollowUser from '../../hooks/useFollowUser';
import { Link } from 'react-router-dom';

const SuggestedUser = ({ user }) => {
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
      <Flex alignItems={'center'} gap={2}>
        <Link to={`/user/${user.uid}/posts`}>
          <Avatar src={user.profilePicURL} name={user.fullName} size={'md'} />
        </Link>
        <VStack spacing={2} alignItems={'flex-start'}>
          <Link to={`/user/${user.uid}/posts`}>
            <Box fontSize={12} fontWeight={'bold'}>
              {user.fullName}
            </Box>
          </Link>
          <Box fontSize={11} color={'gray.500'}>
            {user.followers.length} followers
          </Box>
        </VStack>
      </Flex>
      {/* {authUser.uid !== user.uid && ( */}
      <Button
        fontSize={13}
        bg={'transparent'}
        p={0}
        h={'max-content'}
        fontWeight={'medium'}
        color={'blue.300'}
        cursor={'pointer'}
        _hover={{ color: 'white' }}
        onClick={handleFollowUser}
        isLoading={isUpdating}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
      {/* )} */}
    </Flex>
  );
};

export default SuggestedUser;
