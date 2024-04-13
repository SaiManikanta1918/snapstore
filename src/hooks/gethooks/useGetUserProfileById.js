import { useEffect, useState } from 'react';
import useShowToast from '../useShowToast';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

const useGetUserProfileById = (userId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const showToast = useShowToast();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const userRef = await getDoc(doc(firestore, 'users', userId));
        if (userRef.exists()) {
          setUser(userRef.data());
        }
      } catch (error) {
        showToast('Error', error.message, 'error');
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, [showToast, userId]);

  return { isLoading, user };
};

export default useGetUserProfileById;
