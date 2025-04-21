import { Link } from 'react-router-dom';

import styles from './Search.module.css';

import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';

import PostDetails from '../../components/postDetails/postDetails';
import { useEffect } from 'react';

const Search = () => {
	const query = useQuery();
	const search = query.get('q');

	const { documents: posts, loadDocuments } = useFetchDocuments(
		'posts',
		search,
	);

	useEffect(() => {
		if (search) {
			loadDocuments();
		}
	}, [search, loadDocuments]);
	return (
		<div className={styles.search}>
			<h1>Search</h1>
			<div className={styles.search_list}>
				{posts && posts.length === 0 && (
					<>
						<p>Não foram encontrados posts a partir da sua busca...😥</p>
						<Link to='/' className='btn btn-primary'>
							Voltar
						</Link>
					</>
				)}
				{posts &&
					posts.map((post) => <PostDetails key={post.id} post={post} />)}
			</div>
		</div>
	);
};

export default Search;
