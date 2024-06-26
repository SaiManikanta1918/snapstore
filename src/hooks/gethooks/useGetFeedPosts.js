import { useEffect, useState } from 'react';
import usePostStore from '../../store/postStore';
import useAuthStore from '../../store/authStore';
import useShowToast from '../useShowToast';
import { collection, getDocs, query } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import PostModel from '../../models/PostModel';

const useGetFeedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  useEffect(() => {
    const getFeedPosts = async () => {
      setIsLoading(true);
      const q = query(collection(firestore, 'posts'));

      try {
        const querySnapshot = await getDocs(q);
        const feedPosts = [];

        querySnapshot.forEach((doc) => {
          feedPosts.push(PostModel.mapModel({ id: doc.id, ...doc.data() }));
        });

        feedPosts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(feedPosts);
      } catch (error) {
        showToast('Error', error.message, 'error');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser) getFeedPosts();
  }, [authUser, showToast, setPosts]);

  return { isLoading, posts };
};

export default useGetFeedPosts;
