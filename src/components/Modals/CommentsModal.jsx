import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
} from '@chakra-ui/react';
import Comment from '../Comment/Comment';
import usePostComment from '../../hooks/usePostComment';
import { useEffect, useRef, useState } from 'react';

const CommentsModal = ({ isOpen, onClose, post }) => {
  const { handlePostComment, isCommenting } = usePostComment();
  const [comment, setComment] = useState('');
  const commentsContainerRef = useRef(null);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    await handlePostComment(post.id, comment);
    setComment('');
  };

  useEffect(() => {
    const scrollToBottom = () => {
      commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
    };
    if (isOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [isOpen, post.comments.length]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
      <ModalOverlay />
      <ModalContent bg={'black'} border={'1px solid gray'} maxW={'400px'}>
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton disabled={isCommenting} />
        <ModalBody>
          <Flex
            mb={4}
            gap={4}
            flexDir={'column'}
            maxH={'250px'}
            overflowY={'auto'}
            ref={commentsContainerRef}
          >
            {post.comments.map((comment, idx) => (
              <Comment key={idx} comment={comment} />
            ))}
          </Flex>
          <Input
            value={comment}
            placeholder="Comment"
            size={'sm'}
            onChange={(e) => setComment(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Flex w={'full'} justifyContent={'flex-end'}>
            <Button size={'sm'} isDisabled={isCommenting}>
              Cancel
            </Button>
            <Button
              size={'sm'}
              ml={4}
              isLoading={isCommenting}
              isDisabled={!comment}
              onClick={handleSubmitComment}
            >
              Post
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CommentsModal;
