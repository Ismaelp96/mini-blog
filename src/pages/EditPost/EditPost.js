import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './EditPost.module.css';
import { UserInsertDocument } from '../../hooks/useInsertDocument';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocument } from '../../hooks/useFetchDocument';

const EditPost = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { loadDocument, document: postId } = useFetchDocument('posts', id);
	const { insertDocument, response } = UserInsertDocument('posts');
	const { user } = useAuthValue();
	const [post, setPost] = useState({
		title: '',
		img: '',
		body: '',
		error: '',
		tags: '',
	});

	useEffect(() => {
		loadDocument();
	}, [loadDocument]);

	useEffect(() => {
		if (postId) {
			setPost({ ...postId, tags: postId.tags.join(',') });
		}
	}, [postId]);

	const handleSubmit = (e) => {
		e.preventDefault();
		let formError = '';
		try {
			new URL(post.img);
		} catch (error) {
			formError = 'Imagem precisa ser uma URL.';
		}

		const tagsArray = post.tags
			.split(',')
			.map((tag) => tag.trim().toLowerCase());

		if (!post.title || !post.img || !post.body || !post.tags) {
			formError = 'Todos os campos devem ser preenchidos.';
		}
		if (formError) {
			setPost({ ...post, error: formError });
			return;
		}

		setPost({ ...post, error: '' });

		insertDocument({
			title: post.title,
			img: post.img,
			body: post.body,
			tags: tagsArray,
			uid: user.uid,
			createdBy: user.displayName,
		});
		navigate('/');
	};

	return (
		<div className={styles.edit_post}>
			{postId && (
				<>
					<h1>
						Deseja editar sua postagem: <span>{postId.title}</span>
					</h1>
					<p>Altere os dados do post como desejar!</p>
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
							<div className={styles.image_preview}>
								<div className={styles.preview}>
									<p>Preview da imagem atual:</p>
									<img src={post.img} alt={post.title} />
								</div>
								<div className={styles.edit_preview}>
									<label>
										<span>URL da imagem:</span>
										<input
											type='text'
											name='image'
											placeholder='http://'
											required
											value={post.img}
											onChange={(e) =>
												setPost({ ...post, img: e.target.value })
											}
										/>
									</label>
								</div>
							</div>

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
						{!response.loading && (
							<button className='btn btn-primary'>Editar</button>
						)}
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
						{post.error && (
							<div className='error'>
								<p>{post.error}</p>
							</div>
						)}
					</form>
				</>
			)}
		</div>
	);
};

export default EditPost;
