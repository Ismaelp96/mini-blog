import { Link } from 'react-router-dom';

import styles from './Dashboard.module.css';

import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useEffect } from 'react';
const Dashboard = () => {
	const { user } = useAuthValue();
	const uid = user.uid;

	const {
		documents: posts,
		loadDocuments,
		loading,
	} = useFetchDocuments('posts', null, uid);

	useEffect(() => loadDocuments(), [loadDocuments]);

	if (loading) {
		return <p>Carregando...</p>;
	}

	const deleteDocument = (id) => {
		console.log('excluir', id);
	};

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
				<>
					<div>
						<button>Título</button>
						<button>Ações</button>
					</div>
					{posts &&
						posts.map((post) => (
							<div key={post.id}>
								<h3>{post.title}</h3>
								<div>
									<Link to={`/posts/${post.id}`} className='btn btn-outline'>
										Ver
									</Link>
									<Link
										to={`/posts/edit/${post.id}`}
										className='btn btn-outline'>
										Editar
									</Link>
									<button
										className='btn btn-destructive'
										onClick={() => deleteDocument(post.id)}>
										Excluir
									</button>
								</div>
							</div>
						))}
				</>
			)}
		</div>
	);
};

export default Dashboard;
