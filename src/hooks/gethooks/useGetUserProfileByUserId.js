import { useEffect, useState } from 'react';
import useShowToast from '../useShowToast';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import useUserProfileStore from '../../store/userProfileStore';
import UserModel from '../../models/UserModel';

const useGetUserProfileByUserId = (userId) => {
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useShowToast();
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(firestore, 'users'), where('id', '==', userId));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) return setUserProfile(null);

        let userDoc;
        querySnapshot.forEach((doc) => {
          userDoc = { ...doc.data(), id: doc.id };
        });
        setUserProfile(UserModel.mapModel(userDoc));
      } catch (error) {
        showToast('Error', error.message, 'error');
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [setUserProfile, userId, showToast]);

  return { isLoading, userProfile };
};

export default useGetUserProfileByUserId;
