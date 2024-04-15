import { useState } from 'react';
import useShowToast from '../useShowToast';
import useAuthStore from '../../store/authStore';
import useUserProfileStore from '../../store/userProfileStore';
import { useNavigate } from 'react-router-dom';
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

const useCreateChat = () => {
  const navigate = useNavigate();
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);

  const userProfile = useUserProfileStore((state) => state.userProfile);

  const createChat = async () => {
    setIsLoading(true);
    try {
      const chatRef = await addDoc(collection(firestore, 'chats'), {
        messages: [],
        users: [authUser.id, userProfile.id],
      });
      const chatId = chatRef.id;
      const conversation = {
        chatId,
        createdAt: Date.now(),
        hasHistory: false,
      };

      await updateDoc(doc(firestore, 'users', authUser.id), {
        conversations: arrayUnion({ userId: userProfile.id, ...conversation }),
      });
      await updateDoc(doc(firestore, 'users', userProfile.id), {
        conversations: arrayUnion({
          userId: authUser.id,
          ...conversation,
        }),
      });
      setAuthUser({
        ...authUser,
        conversations: [...authUser.conversations, { userId: userProfile.id, ...conversation }],
      });

      return chatId;
    } catch (error) {
      showToast('Error', error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  async function sendMessageFromProfile() {
    const conversation = authUser.conversations.find((obj) => obj.userId === userProfile.id);
    let chatId;
    if (conversation) {
      chatId = conversation.chatId;
    } else {
      chatId = await createChat(userProfile.id);
    }
    if (chatId) navigate(`/chat/${chatId}`);
  }

  return { isLoading, sendMessageFromProfile };
};

export default useCreateChat;
