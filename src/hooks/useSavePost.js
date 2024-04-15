import { useState } from 'react';
import useAuthStore from '../store/authStore';
import useShowToast from './useShowToast';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import usePostStore from '../store/postStore';

const useSavePost = (post) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const [isSaved, setIsSaved] = useState(post.saves?.includes(authUser?.id));
  const showToast = useShowToast();
  const { savedPosts, setSavedPosts } = usePostStore();

  function updatedSavedPosts() {
    const newSavedPosts = isSaved
      ? savedPosts.filter((savedPost) => savedPost.id !== post.id)
      : [...savedPosts, post];
    setSavedPosts(newSavedPosts);
  }

  const handleSavePost = async () => {
    if (isUpdating) return;
    if (!authUser) return showToast('Error', 'You must be logged in to save a post', 'error');
    setIsUpdating(true);

    try {
      const newSaves = isSaved ? post.savesExceptUser(authUser.id) : [...post.saves, authUser.id];
      await updateDoc(doc(firestore, 'posts', post.id), {
        saves: isSaved ? arrayRemove(authUser.id) : arrayUnion(authUser.id),
      });
      post.setSaves(newSaves);
      setIsSaved(!isSaved);
      updatedSavedPosts();
    } catch (error) {
      showToast('Error', error.message, 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  return { isSaved, setIsSaved, handleSavePost, isUpdating };
};

export default useSavePost;
