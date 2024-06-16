import { Flex, Image, Text } from '@chakra-ui/react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../firebase/firebase';
import useShowToast from '../../hooks/useShowToast';
import useAuthStore from '../../store/authStore';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import UserModel from '../../models/UserModel';

const GoogleAuth = ({ prefix }) => {
  const [signInWithGoogle, error] = useSignInWithGoogle(auth);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);

  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
      setIsLoading(true);
      if (!newUser) {
        return;
      }
      if (error) {
        showToast('Error', error.message, 'error');
        console.error(error);
        return;
      }
      const id = newUser.user.uid;
      const userdoc = await getDoc(doc(firestore, 'users', id));
      let userDoc;
      if (userdoc.exists()) {
        // login
        userDoc = UserModel.mapModel({ ...userdoc.data(), id: userdoc.id });
      } else {
        // signup
        userDoc = UserModel.mapModel({
          createdAt: Date.now(),
          id,
          email: newUser.user.email,
          fullName: newUser.user.displayName,
          username: newUser.user.email.split('@')[0],
          profilePicURL: newUser.user.photoURL,
          isPrivate: false,
        });
        await setDoc(doc(firestore, 'users', id), JSON.parse(JSON.stringify(userDoc)));
      }
      setIsLoading(false);
      localStorage.setItem('user-info', JSON.stringify(userDoc));
      loginUser(userDoc);
    } catch (error) {
      showToast('Error', error.message, 'error');
      console.error(error);
    }
  };

  return (
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      cursor={'pointer'}
      onClick={handleGoogleAuth}
    >
      <Image src="/google.png" w={5} alt="Google logo" />
      <Text mx="2" color={'blue.500'}>
        {prefix} with Google
      </Text>
    </Flex>
  );
};

export default GoogleAuth;
