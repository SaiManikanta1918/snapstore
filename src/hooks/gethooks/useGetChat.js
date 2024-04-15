import { useEffect, useState } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import ChatMessageModel from '../../models/ChatMessageModel';
import useAuthStore from '../../store/authStore';
import UserModel from '../../models/UserModel';

const useGetChat = (chatId) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState(null);

  const authUser = useAuthStore((state) => state.user);

  const getUserData = async (userIds) => {
    const userId = userIds.find((user) => user !== authUser.id);
    const user = await getDoc(doc(firestore, 'users', userId));
    setUserData(UserModel.mapModel({ ...user.data(), id: user.id }));
  };

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(doc(firestore, 'chats', chatId), (doc) => {
      if (!doc) {
        setIsLoading(false);
      }
      const messages = ChatMessageModel.mapModels(doc.data().messages);
      if (!userData) {
        getUserData(doc.data().users);
      }
      setMessages(messages);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { isLoading, userData, messages };
};

export default useGetChat;
