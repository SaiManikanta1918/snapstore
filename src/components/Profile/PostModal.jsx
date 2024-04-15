import {
  Avatar,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import useAuthStore from '../../store/authStore';
import useUserProfileStore from '../../store/userProfileStore';
import DeleteAlert from '../common/DeleteAlert';
import PostFooter from '../FeedPosts/PostFooter';
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
      await deleteDoc(doc(firestore, 'posts', post.id));

      await updateDoc(doc(firestore, 'users', authUser.id), {
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
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody bg={'grey.200'} pb={5}>
          <Flex gap="4" mx={'auto'} maxH={'90vh'} minH={'50vh'} flexDirection={'column'}>
            <Flex alignItems={'center'} justifyContent={'space-between'} mr={10}>
              <Flex alignItems={'center'} gap={4}>
                <Avatar src={authUser.profilePicURL} name={authUser.fullName} size={'sm'} />
                <Text fontWeight={'bold'} fontSize={12}>
                  {authUser.username}
                </Text>
              </Flex>
              {userId && authUser.id === post.createdBy && (
                <DeleteAlert deleteItem={handleDeletePost} isDeleting={isDeleting} />
              )}
            </Flex>
            <Flex
              borderRadius={4}
              overflow={'hidden'}
              border={'1px solid'}
              borderColor={'whiteAlpha.300'}
              flex={1}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Image src={post.imageURL} alt="profile post" w={'400px'} h={'400px'} />
            </Flex>
            <PostFooter isProfilePage={true} post={post} />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default PostModal;
