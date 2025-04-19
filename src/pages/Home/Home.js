import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

import styles from './Home.module.css';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import PostDetails from '../../components/postDetails/postDetails';
const Home = () => {
	const [homeState, setHomeState] = useState({
		query: '',
	});
	const { documents: posts, loading, error } = useFetchDocuments('posts');

	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<div className={styles.home}>
			<h1>Veja os nossos posts mais recentes!</h1>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Busque por tags'
					value={homeState.query}
					onChange={(e) =>
						setHomeState({ ...homeState, query: e.target.value })
					}
				/>
				<button className='btn-outline'>Pesquisar</button>
			</form>
			<div className={styles.posts}>
				{loading && <p>Carregando...</p>}
				{posts &&
					posts.map((post) => <PostDetails key={post.id} post={post} />)}
				{homeState.posts && homeState.posts.length === 0 && (
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
