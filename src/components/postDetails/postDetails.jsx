import styles from './postDetails.module.css';

import { Link } from 'react-router-dom';

const PostDetails = ({ post }) => {
	return (
		<div className={styles.post}>
			<img src={post.img} alt={post.title} />
			<h2>{post.title}</h2>
			<p>{post.createdBy}</p>
			<div>
				{post.tags.map((tag, i) => (
					<div key={i}>
						<span>#</span>
						<p>{tag}</p>
					</div>
				))}
			</div>
			<Link to={`/post/${post.id}`}>Ler</Link>
		</div>
	);
};

export default PostDetails;
