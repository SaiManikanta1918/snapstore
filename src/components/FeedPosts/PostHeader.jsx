import { Avatar, Box, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { timeAgo } from '../../utils/timeAgo';

const PostHeader = ({ post, isProfilePage, creatorProfile }) => {
  return (
    <>
      <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'} my={2}>
        <Flex alignItems={'center'} gap={2}>
          {creatorProfile ? (
            <Link to={`/user/${creatorProfile.id}/posts`}>
              <Avatar
                src={creatorProfile.profilePicURL}
                name={creatorProfile.fullName}
                alt="user profile pic"
                size={'sm'}
              />
            </Link>
          ) : (
            <SkeletonCircle size="10" />
          )}

          <Flex fontSize={12} fontWeight={'bold'} gap="2">
            {creatorProfile ? (
              <Link to={`/user/${creatorProfile.id}/posts`}>{creatorProfile.username}</Link>
            ) : (
              <Skeleton w={'100px'} h={'10px'} />
            )}

            <Box color={'gray.500'}>• {timeAgo(post.createdAt)}</Box>
          </Flex>
        </Flex>
      </Flex>
      {!isProfilePage && (
        <Box py={2}>
          {post.caption && (
            <>
              <Text as="span" fontWeight={400}>
                {post.caption}
              </Text>
              <br />
            </>
          )}
          {post.tags &&
            post.tags.map((tag, index) => (
              <Text color={'gray'} key={index} as="span" fontWeight={400}>
                #{tag}
              </Text>
            ))}
        </Box>
      )}
    </>
  );
};

export default PostHeader;
