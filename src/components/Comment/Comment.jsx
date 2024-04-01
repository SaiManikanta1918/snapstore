import { Avatar, Flex, Text } from '@chakra-ui/react';
import useGetUserProfileById from '../../hooks/useGetUserProfileById';
import { Link } from 'react-router-dom';
import { timeAgo } from '../../utils/timeAgo';
import { CommentSkeleton } from '../Loaders';

const Comment = ({ comment }) => {
  const { user: userProfile, isLoading } = useGetUserProfileById(comment.createdBy);

  if (isLoading) return <CommentSkeleton />;
  return (
    <Flex gap={4}>
      <Link to={`/user/${userProfile.uid}/posts`}>
        <Avatar src={userProfile.profilePicURL} name={userProfile.fullName} size={'sm'} />
      </Link>
      <Flex direction={'column'}>
        <Flex gap={2} alignItems={'center'}>
          <Link to={`/user/${userProfile.uid}/posts`}>
            <Text fontWeight={'bold'} fontSize={12}>
              {userProfile.username}
            </Text>
          </Link>
          <Text fontSize={14}>{comment.comment}</Text>
        </Flex>
        <Text fontSize={12} color={'gray'}>
          {timeAgo(comment.createdAt)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Comment;
