import { Link } from 'react-router-dom';

import styles from './Dashboard.module.css';

import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
const Dashboard = () => {
	const { user } = useAuthValue();
	const uid = user.uid;
	const posts = [];
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
		</div>
	);
};

export default Dashboard;
