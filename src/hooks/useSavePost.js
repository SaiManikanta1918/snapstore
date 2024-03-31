import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useSavePost = (post) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const [isSaved, setIsSaved] = useState(post.saves?.includes(authUser?.uid));
  const showToast = useShowToast();

  const handleSavePost = async () => {
    if (isUpdating) return;
    if (!authUser)
      return showToast(
        "Error",
        "You must be logged in to save a post",
        "error"
      );
    setIsUpdating(true);

    try {
      const postRef = doc(firestore, "posts", post.id);
      const newSaves = isSaved
        ? post.saves.filter((userId) => userId !== authUser.uid)
        : [...post.saves, authUser.uid];
      await updateDoc(postRef, {
        saves: isSaved ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      });
      post.saves = newSaves;
      setIsSaved(!isSaved);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  return { isSaved, setIsSaved, handleSavePost, isUpdating };
};

export default useSavePost;





