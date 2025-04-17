import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './CreatePost.module.css';
import { UserInsertDocument } from '../../hooks/useInsertDocument';
import { useAuthValue } from '../../context/AuthContext';

const CreatePost = () => {
	const { insertDocument, response } = UserInsertDocument('posts');
	const { user } = useAuthValue();
	const [post, setPost] = useState({
		title: '',
		img: '',
		body: '',
		error: '',
		tags: [],
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		setPost({ ...post, error: '' });
		// if (!post.img.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i)) {
		// 	setPost({
		// 		...post,
		// 		error: 'A URL da imagem deve ser válida (jpg, png, gif).',
		// 	});
		// 	return;
		// }
		const tagsArray = post.tags
			.split(',')
			.map((tag) => tag.trim().toLowerCase());
		setPost({ ...post, error: '' });
		insertDocument({
			title: post.title,
			img: post.img,
			body: post.body,
			tags: tagsArray,
			uid: user.uid,
			createdBy: user.displayName,
		});
	};

	return (
		<div className={styles.create_post}>
			<h1>Crie seu post</h1>
			<p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
			<form onSubmit={handleSubmit}>
				<div className={styles.grid_inputs}>
					<label>
						<span>Título:</span>
						<input
							type='text'
							name='title'
							placeholder='Pense num bom título...'
							required
							value={post.title}
							onChange={(e) => setPost({ ...post, title: e.target.value })}
						/>
					</label>
					<label>
						<span>URL da imagem:</span>
						<input
							type='text'
							name='image'
							placeholder='http://'
							required
							value={post.img}
							onChange={(e) => setPost({ ...post, img: e.target.value })}
						/>
					</label>
					<label>
						<span>Tags:</span>
						<input
							type='text'
							name='tags'
							required
							value={post.tags}
							onChange={(e) => setPost({ ...post, tags: e.target.value })}
						/>
					</label>
				</div>
				<label>
					<span>Conteúdo:</span>
					<textarea
						name='body'
						required
						placeholder='O que você quer compartilhar hoje?'
						value={post.body}
						onChange={(e) => setPost({ ...post, body: e.target.value })}
					/>
				</label>
				{!response.loading && <button className='btn'>Postar</button>}
				{response.loading && (
					<button className='btn' disabled>
						Aguarde...
					</button>
				)}
				{response.error && (
					<div className='error'>
						<p>{response.error}</p>
					</div>
				)}
			</form>
		</div>
	);
};

export default CreatePost;
