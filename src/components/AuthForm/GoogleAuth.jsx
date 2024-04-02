import { Flex, Image, Text } from '@chakra-ui/react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../firebase/firebase';
import useShowToast from '../../hooks/useShowToast';
import useAuthStore from '../../store/authStore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const GoogleAuth = ({ prefix }) => {
  const [signInWithGoogle, error] = useSignInWithGoogle(auth);

  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
      if (!newUser && error) {
        showToast('Error', error.message, 'error');
        return;
      }
      const userRef = doc(firestore, 'users', newUser.user.uid);
      const userSnap = await getDoc(userRef);
      let userDoc;
      if (userSnap.exists()) {
        // login
        userDoc = userSnap.data();
      } else {
        // signup
        userDoc = {
          bio: '',
          createdAt: Date.now(),
          uid: newUser.user.uid,
          email: newUser.user.email,
          fullName: newUser.user.displayName,
          username: newUser.user.email.split('@')[0],
          profilePicURL: newUser.user.photoURL,
          isPrivate: false,
        };
        await setDoc(doc(firestore, 'users', newUser.user.uid), userDoc);
      }
      localStorage.setItem('user-info', JSON.stringify(userDoc));
      loginUser(userDoc);
    } catch (error) {
      showToast('Error', error.message, 'error');
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
