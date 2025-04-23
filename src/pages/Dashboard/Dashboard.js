import { Link } from 'react-router-dom';

import styles from './Dashboard.module.css';

import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useEffect } from 'react';
const Dashboard = () => {
	const { user } = useAuthValue();
	const uid = user.uid;

	const { documents: posts, loadDocuments } = useFetchDocuments(
		'posts',
		null,
		uid,
	);

	useEffect(() => loadDocuments(), [loadDocuments]);

	return (
		<div>
			<h2>Dashboard</h2>
			<p>Seja bem-vindo, {user.displayName}</p>
			<p>Seu email: {user.email}</p>

			<p>Gerencie os seus posts</p>
			{posts && posts.length === 0 ? (
				<div className={styles.nopost}>
					<p>Não foram encontrados posts...</p>
					<Link to='/posts/create' className='btn btn-primary'>
						Criar post
					</Link>
				</div>
			) : (
				<div>
					<p>tem posts!</p>
				</div>
			)}
			{posts &&
				posts.map((post) => (
					<div key={post.id}>
						<h2>{post.title}</h2>
					</div>
				))}
		</div>
	);
};

export default Dashboard;
