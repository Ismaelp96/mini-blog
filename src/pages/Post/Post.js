import { useParams } from 'react-router-dom';

import styles from './Post.module.css';

import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useEffect } from 'react';
const Post = () => {
	const { id } = useParams();
	const {
		document: post,
		error,
		loading,
		loadDocument,
	} = useFetchDocument('posts', id);

	useEffect(() => {
		loadDocument();
	}, [loadDocument]);

	return (
		<>
			{loading && <p>Carregando Post...</p>}
			{post && (
				<div className={styles.post_container}>
					<div className={styles.post_left}>
						<h1>{post.title}</h1>
						<img src={post.img} alt={post.title} />
					</div>
					<div className={styles.post_right}>
						<p>{post.body}</p>
						<h3>Este post trata sobre:</h3>
						<ul className={styles.tags}>
							{post.tags.map((tag, i) => (
								<li key={i}>
									<span>#</span>
									<p>{tag}</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
			{error && <p>Erro: {error}</p>}
		</>
	);
};

export default Post;
