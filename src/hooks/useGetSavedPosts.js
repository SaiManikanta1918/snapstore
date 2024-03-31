import { useEffect, useState } from 'react';
import usePostStore from '../store/postStore';
import useShowToast from './useShowToast';
import useUserProfileStore from '../store/userProfileStore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import PostModel from '../models/PostModel';

const useGetSavedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { savedPosts, setSavedPosts } = usePostStore();
  const showToast = useShowToast();
  const userProfile = useUserProfileStore((state) => state.userProfile);

  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile) return;
      setIsLoading(true);
      setSavedPosts([]);

      try {
        const q = query(
          collection(firestore, 'posts'),
          where('saves', 'array-contains', userProfile.uid)
        );
        const querySnapshot = await getDocs(q);

        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push(PostModel.mapModel({ id: doc.id, ...doc.data() }));
        });

        posts.sort((a, b) => b.createdAt - a.createdAt);
        setSavedPosts(posts);
      } catch (error) {
        showToast('Error', error.message, 'error');
        setSavedPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [setSavedPosts, userProfile, showToast]);

  return { isLoading, savedPosts };
};

export default useGetSavedPosts;
