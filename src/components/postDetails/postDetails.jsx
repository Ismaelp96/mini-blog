import styles from './postDetails.module.css';

import { Link } from 'react-router-dom';

const PostDetails = ({ post }) => {
	return (
		<div className={styles.post}>
			<img src={post.img} alt={post.title} />
			<div className={styles.content_text}>
				<div className={styles.title}>
					<h2>{post.title}</h2>
					<p>Autor: {post.createdBy}</p>
				</div>
				<p>{post.body}</p>
				<ul className={styles.tags}>
					{post.tags.map((tag, i) => (
						<li key={i}>
							<span>#</span>
							<p>{tag}</p>
						</li>
					))}
				</ul>
				<Link to={`/post/${post.id}`} className='btn btn-read'>
					Ler
				</Link>
			</div>
		</div>
	);
};

export default PostDetails;
