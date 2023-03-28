import { FormEvent, useEffect, useState } from 'react';
import {
  createPost, deletePost, getPosts, updatePost,
} from './api/posts';
import './App.scss';
import { PostCard } from './components/PostCard';
import { TextField } from './components/TextField';
import { Post } from './types/Post';

export const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');
  const [isEdited, setIsEdited] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const clearForm = () => {
    setTitle('');
    setText('');
    setUrl('');
    setImage('');
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const createdPost = await createPost({
      title,
      text,
      url,
      image: image || 'https://via.placeholder.com/360x270.png?text=no%20preview',
    });

    setPosts(prev => [...prev, createdPost]);

    setCount(prevCount => prevCount + 1);
    clearForm();
  };

  const handleEdit = (
    postTitle: string,
    postDescription: string,
    postLink: string,
    postImgUrl: string,
    postId: number,
  ) => {
    setTitle(postTitle);
    setText(postDescription);
    setUrl(postLink);
    setImage(postImgUrl);
    setIsEdited(true);
    setSelectedPostId(postId);
  };

  const handleDeletion = async (postId: number) => {
    await deletePost(postId);
    setPosts(prevPosts => prevPosts.filter(
      currentTodo => currentTodo.id !== postId,
    ));
  };

  const handleCancelEditing = () => {
    setTitle('');
    setText('');
    setUrl('');
    setImage('');
    setIsEdited(false);
    setCount(prev => prev + 1);
  };

  const handleSaveAfterEdit = async () => {
    const updatedPost = await updatePost(selectedPostId, {
      title, text, url, image,
    });

    setPosts(prev => prev.map(post => {
      if (post.id === selectedPostId) {
        return updatedPost;
      }

      return post;
    }));

    setIsEdited(false);
    clearForm();
    setCount(prev => prev + 1);
  };

  useEffect(() => {
    getPosts()
      .then(setPosts);
  }, []);

  return (
    <div className="page">
      <div className="page-content">
        <div className="posts">
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onDeletion={handleDeletion}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </div>
      <div className="sidebar">
        <form
          className="NewMovie"
          onSubmit={handleSubmit}
          key={count}
        >
          <h2 className="title">Add a movie</h2>

          <TextField
            name="title"
            label="Title"
            value={title}
            onChange={setTitle}
            required
          />

          <TextField
            name="text"
            label="Description"
            value={text}
            onChange={setText}
            required
          />

          <TextField
            name="url"
            label="Post URL"
            value={url}
            onChange={setUrl}
            required
          />

          <TextField
            name="imgURL"
            label="Img URL"
            value={image}
            onChange={setImage}
          />

          <div className="field is-grouped">
            <div className="control">
              {isEdited ? (
                <>
                  <button
                    type="button"
                    className="button is-light is-success mr-3"
                    onClick={handleSaveAfterEdit}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="button is-light is-danger"
                    onClick={handleCancelEditing}
                  >
                    Cancel editing
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  className="button is-link"
                  disabled={!title.trim() || !text.trim() || !url.trim()}
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
