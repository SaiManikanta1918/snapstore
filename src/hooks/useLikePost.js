import { useState } from 'react';
import useAuthStore from '../store/authStore';
import useShowToast from './useShowToast';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import usePostStore from '../store/postStore';

const useLikePost = (post) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const [likes, setLikes] = useState(post.noOfLikes);
  const [isLiked, setIsLiked] = useState(post.isUserLiked(authUser?.id));
  const showToast = useShowToast();
  const { likedPosts, setLikedPosts } = usePostStore();

  function updatedLikedPosts() {
    const newSavedPosts = isLiked
      ? likedPosts.filter((savedPost) => savedPost.id !== post.id)
      : [...likedPosts, post];
    setLikedPosts(newSavedPosts);
  }

  const handleLikePost = async () => {
    if (isUpdating) return;
    if (!authUser) return showToast('Error', 'You must be logged in to like a post', 'error');
    setIsUpdating(true);

    try {
      const newLikes = isLiked ? post.likesExceptUser(authUser.id) : [...post.likes, authUser.id];
      await updateDoc(doc(firestore, 'posts', post.id), {
        likes: isLiked ? arrayRemove(authUser.id) : arrayUnion(authUser.id),
      });
      post.setLikes(newLikes);
      setIsLiked(!isLiked);
      isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
      updatedLikedPosts();
    } catch (error) {
      showToast('Error', error.message, 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  return { isLiked, likes, handleLikePost, isUpdating };
};

export default useLikePost;
