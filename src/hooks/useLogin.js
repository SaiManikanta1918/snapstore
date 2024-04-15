import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import useShowToast from './useShowToast';
import { auth, firestore } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import useAuthStore from '../store/authStore';
import UserModel from '../models/UserModel';

const useLogin = () => {
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);

  const login = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      return showToast('Error', 'Please fill all the fields', 'error');
    }
    try {
      const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);
      if (!userCred) {
        showToast('Error', 'Invalid Credentials', 'error');
        return;
      }
      const userdoc = await getDoc(doc(firestore, 'users', userCred.user.id));
      const userData = UserModel.mapModel({ ...userdoc.data(), id: userdoc.id });
      localStorage.setItem('user-info', JSON.stringify(userData));
      loginUser(userData);
    } catch (error) {
      showToast('Error use login', error.message, 'error');
    }
  };

  return { loading, error, login };
};

export default useLogin;
