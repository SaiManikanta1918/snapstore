import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import useShowToast from '../useShowToast';
import { useEffect, useState } from 'react';
import UserModel from '../../models/UserModel';
import useAuthStore from '../../store/authStore';

const useGetLoggedInUser = async (userId) => {
  const [isLoading, setIsLoading] = useState(false);
  const setAuthUser = useAuthStore((state) => state.setUser);

  const showToast = useShowToast();

  const getUserProfile = async () => {
    if (!userId) {
      localStorage.setItem('user-info', JSON.stringify({}));
      return;
    }
    setIsLoading(true);
    try {
      const userdoc = await getDoc(doc(firestore, 'users', userId));
      if (userdoc.exists()) {
        const userData = UserModel.mapModel({ ...userdoc.data(), id: userdoc.id });
        localStorage.setItem('user-info', JSON.stringify(userData));
        setAuthUser(userData);
      }
    } catch (error) {
      console.log('error', error);
      showToast('Error use get logged in user', error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return { isLoading };
};

export default useGetLoggedInUser;
