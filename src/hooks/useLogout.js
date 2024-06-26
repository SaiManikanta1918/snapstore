import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const [signOut, isLoggingOut, error] = useSignOut(auth);
  const showToast = useShowToast();
  const navigate = useNavigate();
  const logoutUser = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem('user-info');
      logoutUser();
      showToast('Success', 'Signed out successfully', 'success');
      navigate('/login');
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  return { handleLogout, isLoggingOut, error };
};

export default useLogout;
