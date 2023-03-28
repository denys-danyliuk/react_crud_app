import './PostCard.scss';
import { FC } from 'react';
import { Post } from '../../types/Post';

type Props = {
  post: Post;
  onEdit: (
    postTitle: string,
    postDescription: string,
    postLink: string,
    postImgUrl: string,
    postId: number,
  ) => void;
  onDeletion: (postId: number) => void;
};

export const PostCard: FC<Props> = ({ post, onEdit, onDeletion }) => (
  <div className="card">
    <div className="card-image">
      <figure className="image is-4by3">
        <img
          src={post.image}
          alt="Post"
        />
      </figure>
    </div>
    <div className="card-content">
      <div className="media">
        <div className="media-content">
          <p className="title is-8">{post.title}</p>
        </div>
      </div>

      <div className="content">
        {post.text}
        <br />
        <a
          href={post.url}
          target="_blank"
          rel="noreferrer"
        >
          Read more
        </a>
      </div>
    </div>
    <footer className="card-footer">
      <button
        type="button"
        className="button is-fullwidth is-primary"
        onClick={() => onEdit(post.title, post.text, post.url, post.image, post.id)}
      >
        Edit
      </button>
      <button
        type="button"
        className="button is-fullwidth is-danger"
        onClick={() => onDeletion(post.id)}
      >
        Delete
      </button>
    </footer>
  </div>
);
