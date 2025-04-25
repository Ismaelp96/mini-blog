import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import styles from './Dashboard.module.css';

import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';
const Dashboard = () => {
	const { user } = useAuthValue();
	const uid = user.uid;

	const {
		documents: posts,
		loadDocuments,
		loading,
	} = useFetchDocuments('posts', null, uid);

	const { deleteDocument } = useDeleteDocument('posts');

	useEffect(() => loadDocuments(), [loadDocuments]);

	if (loading) {
		return <p>Carregando...</p>;
	}

	return (
		<div className={styles.dashboard}>
			<h2>Dashboard</h2>
			<div className={styles.user_info}>
				<p>Seja bem-vindo, {user.displayName}</p>
				<p>E-mail: {user.email}</p>
			</div>
			{posts && posts.length === 0 ? (
				<div className='no_posts'>
					<p>Não foram encontrados posts...</p>
					<Link to='/posts/create' className='btn btn-primary'>
						Criar post
					</Link>
				</div>
			) : (
				<>
					<div className={styles.table_container}>
						<p>Gerencie os seus posts</p>
						<div className={styles.table_header}>
							<button>Título</button>
							<button>Ações</button>
						</div>
					</div>
					{posts &&
						posts.map((post) => (
							<div key={post.id} className={styles.table_row}>
								<h3>{post.title}</h3>
								<div className={styles.actions}>
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
