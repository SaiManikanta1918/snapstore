import { useState } from 'react';
import { addDoc, arrayUnion, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useShowToast from './useShowToast';

const useSendMessage = () => {
  const showToast = useShowToast();
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState();
  const [conversationUser, setConversationUser] = useState(null);

  async function createChat(userId) {
    const newChat = {
      messages: [],
    };
    const chatsRef = await addDoc(collection(firestore, 'chats'), newChat);

    await updateDoc(doc(firestore, 'users', userId), {
      chats: arrayUnion({ userId: authUser.id, chatId: chatsRef.id, createdAt: Date.now() }),
    });
    await updateDoc(doc(firestore, 'users', authUser.id), {
      chats: arrayUnion({ userId, chatId: chatsRef.id, createdAt: Date.now() }),
    });

    return chatsRef.id;
  }

  const goToChat = async (userId) => {
    try {
      if (!userId) {
        return;
      }
      setIsLoading(true);
      let conversation = authUser.conversations.find(
        (conversation) => conversation.userId === userId
      );

      if (conversation) {
        setChatId(conversation.chatId);
      } else {
        const chatId = await createChat(userId);
        const userdoc = await getDoc(doc(firestore, 'users', userId));
        if (userdoc.exists()) {
          setConversationUser(userdoc.data());
        }
        setChatId(chatId);
      }
      navigate(`/chat/${chatId}`);
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  return { isLoading, goToChat, conversationUser };
};

export default useSendMessage;
