import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';
import UserModel from '../models/UserModel';

const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const signup = async (inputs) => {
    if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
      showToast('Error', 'Please fill all the fields', 'error');
      return;
    }

    const usersRef = collection(firestore, 'users');

    const q = query(usersRef, where('username', '==', inputs.username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      showToast('Error', 'Username already exists', 'error');
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
      const id = newUser.user.uid
      if (!newUser && error) {
        showToast('Error', error.message, 'error');
        return;
      }
      if (newUser) {
        const userDoc = UserModel.mapModel({
          id,
          email: inputs.email,
          username: inputs.username,
          fullName: inputs.fullName,
          bio: '',
          profilePicURL: '',
          createdAt: Date.now(),
        });
        await setDoc(doc(firestore, 'users', id), JSON.parse(JSON.stringify(userDoc)));
        localStorage.setItem('user-info', JSON.stringify(userDoc));
        loginUser(userDoc);
      }
    } catch (error) {
      showToast('Error', error.message, 'error');
      console.error(error);
    }
  };

  return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
