import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import useShowToast from './useShowToast';
import { useEffect, useState } from 'react';

const useGetLoggedInUser = async (authUser) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(false);

  const showToast = useShowToast();

  useEffect(() => {
    if (!authUser) {
      localStorage.setItem('user-info', JSON.stringify({}));
      return;
    }
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const user = await getDoc(doc(firestore, 'users', authUser.uid));
        if (user.exists()) {
          setUser(user.data());
          localStorage.setItem('user-info', JSON.stringify(user.data()));
        }
      } catch (error) {
        showToast('Error', error.message, 'error');
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, [authUser, showToast]);

  return { isLoading, user };
};

export default useGetLoggedInUser;
