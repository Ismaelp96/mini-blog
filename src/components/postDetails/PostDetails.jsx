import styles from './PostDetails.module.css';

import { Link } from 'react-router-dom';

const PostDetails = ({ post }) => {
	return (
		<div className={styles.post}>
			<img src={post.img} alt={post.title} />
			<div className={styles.content_text}>
				<div className={styles.title}>
					<h2>{post.title}</h2>
					<span>Autor: {post.createdBy}</span>
				</div>
				<p className={styles.body_post}>{post.body}</p>
				<div className={styles.bottom_post}>
					<ul className={styles.tags}>
						{post.tags.map((tag, i) => (
							<li key={i}>
								<span>#</span>
								<p>{tag}</p>
							</li>
						))}
					</ul>
					<Link to={`/posts/${post.id}`} className='btn btn-read'>
						Ler
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PostDetails;
