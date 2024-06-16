import { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
import useUserProfileStore from '../store/userProfileStore';
import useShowToast from './useShowToast';
import { firestore } from '../firebase/firebase';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

const useFollowUser = (userId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const { userProfile, setUserProfile } = useUserProfileStore();
  const showToast = useShowToast();

  const handleFollowUser = async () => {
    setIsUpdating(true);
    try {
      await updateDoc(doc(firestore, 'users', authUser.id), {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });

      await updateDoc(doc(firestore, 'users', userId), {
        followers: isFollowing ? arrayRemove(authUser.id) : arrayUnion(authUser.id),
      });
      const newFollwingList = isFollowing
        ? authUser.following.filter((id) => id !== userId)
        : [...authUser.following, userId];

      if (isFollowing) {
        // unfollow
        setAuthUser({
          ...authUser,
          following: authUser.following.filter((id) => id !== userId),
        });
        if (userProfile)
          setUserProfile({
            ...userProfile,
            followers: userProfile.followers.filter((id) => id !== authUser.id),
          });
        setIsFollowing(false);
      } else {
        // follow
        setAuthUser({
          ...authUser,
          following: [...authUser.following, userId],
        });

        if (userProfile)
          setUserProfile({
            ...userProfile,
            followers: [...userProfile.followers, authUser.id],
          });
        setIsFollowing(true);
      }
      localStorage.setItem(
        'user-info',
        JSON.stringify({
          ...authUser,
          following: newFollwingList,
        })
      );
    } catch (error) {
      showToast('Error', error.message, 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (authUser) {
      const isFollowing = (authUser.following || []).includes(userId);
      setIsFollowing(isFollowing);
    }
  }, [authUser, userId]);

  return { isUpdating, isFollowing, handleFollowUser, authUser };
};

export default useFollowUser;
