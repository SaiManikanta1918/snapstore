import { useEffect, useState } from 'react';
import useShowToast from '../useShowToast';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import useAuthStore from '../../store/authStore';

const useGetChatUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);

  const getUsers = async () => {
    const userIds = authUser.conversations.map((conversation) => conversation.userId);
    setIsLoading(true);
    try {
      if (!userIds.length) {
        return;
      }
      const usersRef = collection(firestore, 'users');
      const q = query(usersRef, where('id', 'in', userIds), orderBy('id'));

      const querySnapshot = await getDocs(q);
      const users = [];

      querySnapshot.forEach((doc) => {
        const { id, profilePicURL, fullName } = doc.data();
        const conversation = authUser.conversations.find(
          (conversation) => conversation.userId === id
        );
        if (conversation && conversation.chatId) {
          users.push({
            id: id,
            profilePicURL,
            fullName,
            chatId: conversation.chatId,
          });
        }
      });
      setUsers(users);
    } catch (error) {
      showToast('Error', error.message, 'error');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { isLoading, users };
};

export default useGetChatUsers;
