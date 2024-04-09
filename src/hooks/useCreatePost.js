import { useState } from 'react';
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';
import useUserProfileStore from '../store/userProfileStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { firestore, storage } from '../firebase/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import usePostStore from '../store/postStore';
import PostModel from '../models/PostModel';

const useCreatePost = () => {
  const navigate = useNavigate();
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostStore((state) => state.createPost);
  const addPost = useUserProfileStore((state) => state.addPost);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const { pathname } = useLocation();

  const handleCreatePost = async (post) => {
    if (isLoading) return;
    if (!post.file) throw new Error('Please upload an image');
    setIsLoading(true);
    const newPost = {
      caption: post.caption,
      location: post.location,
      tags: post.tags.split(','),
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    };

    try {
      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost);
      const userDocRef = doc(firestore, 'users', authUser.uid);
      const imageRef = ref(storage, `posts/${postDocRef.id}`);

      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });

      await uploadString(imageRef, post.file, 'data_url');

      // getting error above because 2nd parameter shpuld be string not the object

      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(postDocRef, { imageURL: downloadURL });

      newPost.imageURL = downloadURL;

      if (userProfile.uid === authUser.uid)
        createPost(PostModel.mapModel({ ...newPost, id: postDocRef.id }));

      if (pathname !== '/' && userProfile.uid === authUser.uid) {
        addPost({ ...newPost, id: postDocRef.id });
      }
      navigate('/home');
      showToast('Success', 'Post created successfully', 'success');
    } catch (error) {
      showToast('Error', error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
};

export default useCreatePost;
