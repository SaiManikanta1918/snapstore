import { useEffect, useState } from 'react';
import useShowToast from '../useShowToast';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import UserModel from '../../models/UserModel';

const useGetUsers = (userIds = []) => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const showToast = useShowToast();

  useEffect(() => {
    const getUsers = async () => {
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
          users.push(UserModel.mapModel({ id: doc.id, ...doc.data() }));
        });

        setUsers(users);
      } catch (error) {
        showToast('Error', error.message, 'error');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, [userIds, showToast]);

  return { isLoading, users };
};

export default useGetUsers;
