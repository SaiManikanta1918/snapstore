import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import {
  CommentLogo,
  NotificationsLogo,
  SaveLogo,
  SavedLogo,
  UnlikeLogo,
} from '../../assets/constants';
import usePostComment from '../../hooks/usePostComment';
import useAuthStore from '../../store/authStore';
import useLikePost from '../../hooks/useLikePost';
import { timeAgo } from '../../utils/timeAgo';
import CommentsModal from '../Modals/CommentsModal';
import useSavePost from '../../hooks/useSavePost';

const PostFooter = ({ post, isProfilePage }) => {
  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState('');
  const authUser = useAuthStore((state) => state.user);
  const commentRef = useRef(null);
  const { handleLikePost, isLiked, likes } = useLikePost(post);
  const { isSaved, handleSavePost } = useSavePost(post);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    setComment('');
  };

  return (
    <Box mb={10} marginTop={'auto'}>
      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        gap={4}
        w={'full'}
        pt={0}
        mb={2}
        mt={4}
      >
        <Flex gap={4}>
          <Box onClick={handleLikePost} cursor={'pointer'} fontSize={18}>
            {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
          </Box>

          <Box cursor={'pointer'} fontSize={18} onClick={() => commentRef.current.focus()}>
            <CommentLogo />
          </Box>
        </Flex>
        <Box cursor={'pointer'} fontSize={18} onClick={handleSavePost}>
          {isSaved ? <SavedLogo /> : <SaveLogo />}
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={'sm'}>
        {likes} {likes == 1 ? 'like' : 'likes'}
      </Text>

      {isProfilePage && (
        <Text fontSize="12" color={'gray'}>
          Posted {timeAgo(post.createdAt)}
        </Text>
      )}

      {post.comments.length > 0 && (
        <Text fontSize="sm" color={'gray'} cursor={'pointer'} onClick={onOpen}>
          View all {post.comments.length} comments
        </Text>
      )}
      {isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post} /> : null}

      {authUser && (
        <Flex alignItems={'center'} gap={2} justifyContent={'space-between'} w={'full'}>
          <InputGroup>
            <Input
              variant={'flushed'}
              placeholder={'Add a comment...'}
              fontSize={14}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              ref={commentRef}
            />
            {comment && (
              <InputRightElement>
                <Button
                  fontSize={14}
                  color={'blue.500'}
                  fontWeight={600}
                  cursor={'pointer'}
                  _hover={{ color: 'white' }}
                  bg={'transparent'}
                  onClick={handleSubmitComment}
                  isLoading={isCommenting}
                >
                  Post
                </Button>
              </InputRightElement>
            )}
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
};

export default PostFooter;
