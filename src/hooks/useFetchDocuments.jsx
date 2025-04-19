import { useState, useEffect } from 'react';
import {
	collection,
	query,
	orderBy,
	onSnapshot,
	where,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig.js';

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
	const [fetchDocuments, setFetchDocuments] = useState({
		documents: null,
		error: null,
		loading: null,
		cancelled: false,
	});

	useEffect(() => {
		const LoadData = async () => {
			if (fetchDocuments.cancelled) return;

			setFetchDocuments({ loading: true });
			const collectionRef = await collection(db, docCollection);
			try {
				let q;
				q = await query(collectionRef, orderBy('createdAt', 'desc'));
				await onSnapshot(q, (querySnapshot) => {
					setFetchDocuments({
						documents: querySnapshot.docs.map((doc) => ({
							...doc.data(),
							id: doc.id,
						})),
						loading: false,
					});
				});
			} catch (error) {
				console.error('Erro ao carregar os documentos:', error);
				setFetchDocuments({ error: error.message, loading: false });
			}
		};
		LoadData();
	}, [docCollection, search, uid, fetchDocuments.cancelled]);

	useEffect(() => {
		return () => setFetchDocuments({ cancelled: true });
	}, []);

	return {
		documents: fetchDocuments.documents,
		loading: fetchDocuments.loading,
		error: fetchDocuments.error,
	};
};
