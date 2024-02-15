import { create } from "zustand";

const usePostStore = create((set) => ({
  posts: [],
  likedPosts: [],
  savedPosts: [],
  createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  deletePost: (id) =>
    set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
  setPosts: (posts) => set({ posts }),
  setSavedPosts: (savedPosts) => set({ savedPosts }),
  setLikedPosts: (likedPosts) => set({ likedPosts }),
  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, comment],
          };
        }
        return post;
      }),
    })),
}));

export default usePostStore;



