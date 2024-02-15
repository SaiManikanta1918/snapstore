import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetLikedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { likedPosts, setLikedPosts } = usePostStore();
  const showToast = useShowToast();
  const userProfile = useUserProfileStore((state) => state.userProfile);

  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile) return;
      setIsLoading(true);
      setLikedPosts([]);

      try {
        const q = query(
          collection(firestore, "posts"),
          where("likes", "array-contains", userProfile.uid)
        );
        const querySnapshot = await getDocs(q);

        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });

        posts.sort((a, b) => b.createdAt - a.createdAt);
        setLikedPosts(posts);
      } catch (error) {
        showToast("Error", error.message, "error");
        setLikedPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [setLikedPosts, userProfile, showToast]);

  return { isLoading, likedPosts };
};

export default useGetLikedPosts;

