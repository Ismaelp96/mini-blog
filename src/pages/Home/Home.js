import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './Home.module.css';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import PostDetails from '../../components/postDetails/postDetails';
const Home = () => {
	const [query, setQuery] = useState('');
	const {
		documents: posts,
		loading,
		error,
		loadDocuments,
		cancel,
	} = useFetchDocuments('posts', query);

	const handleSubmit = (e) => {
		e.preventDefault();
		loadDocuments();
	};

	useEffect(() => {
		loadDocuments();

		return cancel;
	}, []);
	return (
		<div className={styles.home}>
			<h1>Veja os nossos posts mais recentes!</h1>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Busque por tags'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button className='btn-outline'>Pesquisar</button>
			</form>
			<div className={styles.posts}>
				{loading && <p>Carregando...</p>}
				{posts &&
					posts.map((post) => <PostDetails key={post.id} post={post} />)}
				{posts && posts.length === 0 && (
					<div className={styles.no_posts}>
						<p>Não foram encontrados posts.</p>
						<Link to='/posts/create' className='btn'>
							Criar primeiro post
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
