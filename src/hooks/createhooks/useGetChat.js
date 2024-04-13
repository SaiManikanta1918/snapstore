import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import ChatModel from '../../models/ChatModel';

const useGetChat = (chatId) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(doc(firestore, 'chats', chatId), (doc) => {
      const messages = ChatModel.mapModels(doc.data().messages);
      setMessages(messages);
      setIsLoading(false);
      // scroll.current.scrollIntoView({ behaviour: 'smooth' });
    });

    return () => unsubscribe();
  }, []);

  return { isLoading, messages };
};

export default useGetChat;
