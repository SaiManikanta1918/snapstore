import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUsers = (userIds) => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const showToast = useShowToast();

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      try {
        const usersRef = collection(firestore, "users");
        const q = query(usersRef, where("uid", "in", userIds), orderBy("uid"));

        const querySnapshot = await getDocs(q);
        const users = [];

        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });

        setUsers(users);
        console.log("users", users);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, [userIds, showToast]);

  return { isLoading, users };
};

export default useGetUsers;

