import {
  Avatar,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import useAuthStore from '../../store/authStore';
import useUserProfileStore from '../../store/userProfileStore';
import DeleteAlert from '../common/DeleteAlert';
import PostFooter from '../FeedPosts/PostFooter';
import Comment from '../Comment/Comment';
import { deleteObject, ref } from 'firebase/storage';
import { firestore, storage } from '../../firebase/firebase';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import useShowToast from '../../hooks/useShowToast';
import { useState } from 'react';
import usePostStore from '../../store/postStore';
import { useParams } from 'react-router-dom';

function PostModal({ isOpen, onClose, post }) {
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const { userId } = useParams();
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = usePostStore((state) => state.deletePost);
  const decrementPostsCount = useUserProfileStore((state) => state.deletePost);

  const handleDeletePost = async () => {
    setIsDeleting(true);

    try {
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);
      const userRef = doc(firestore, 'users', authUser.uid);
      await deleteDoc(doc(firestore, 'posts', post.id));

      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });

      deletePost(post.id);
      decrementPostsCount(post.id);
      showToast('Success', 'Post deleted successfully', 'success');
    } catch (error) {
      showToast('Error', error.message, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: '3xl', md: '5xl' }}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody bg={'black'} pb={5}>
          <Flex
            gap="4"
            w={{ base: '90%', sm: '70%', md: 'full' }}
            mx={'auto'}
            maxH={'90vh'}
            minH={'50vh'}
          >
            <Flex
              borderRadius={4}
              overflow={'hidden'}
              border={'1px solid'}
              borderColor={'whiteAlpha.300'}
              flex={1.5}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Image src={post.imageURL} alt="profile post" />
            </Flex>
            <Flex flex={1} flexDir={'column'} px={10} display={{ base: 'none', md: 'flex' }}>
              <Flex alignItems={'center'} justifyContent={'space-between'}>
                <Flex alignItems={'center'} gap={4}>
                  <Avatar src={authUser.profilePicURL} name={authUser.fullName} size={'sm'} />
                  <Text fontWeight={'bold'} fontSize={12}>
                    {authUser.username}
                  </Text>
                </Flex>

                {userId && authUser.uid === post.createdBy && (
                  <DeleteAlert deleteItem={handleDeletePost} isDeleting={isDeleting} />
                )}
              </Flex>
              <Divider my={4} bg={'gray.500'} />

              <VStack w="full" alignItems={'start'} maxH={'350px'} overflowY={'auto'}>
                {post.comments.map((comment, idx) => (
                  <Comment key={idx} comment={comment} />
                ))}
              </VStack>
              <Divider my={4} bg={'gray.8000'} />

              <PostFooter isProfilePage={true} post={post} />
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default PostModal;
