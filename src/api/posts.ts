import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPosts = () => {
  return client.get<Post[]>('/posts');
};

type preparedPost = Omit<Post, 'id'>;

export const createPost = (
  data: preparedPost,
) => {
  return client.post<Post>('/posts', {
    ...data,
  });
};

export const deletePost = (postId: number) => {
  return client.delete(`/posts/${postId}`);
};

export const updatePost = (postId: number, data: preparedPost) => {
  return client.put<Post>(`/posts/${postId}`, data);
};
