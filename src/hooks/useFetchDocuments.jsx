import { useCallback, useRef, useState } from 'react';
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
	const unsubscribeRef = useRef(null);

	const cancel = useCallback(() => {
		if (unsubscribeRef.current) {
			unsubscribeRef.current();
			unsubscribeRef.current = null;
		}
	}, []);

	const loadDocuments = useCallback(() => {
		setFetchDocuments({ loading: true, error: null });
		cancel();
		try {
			let collectionRef = collection(db, docCollection);
			let q;
			q = query(collectionRef, orderBy('createdAt', 'desc'));
			if (search) {
				q = query(
					collectionRef,
					where('tags', 'array-contains', search),
					orderBy('createdAt', 'desc'),
				);
			} else if (uid) {
				q = query(q, where('uid', '==', uid));
			}
			unsubscribeRef.current = onSnapshot(q, (querySnapshot) => {
				const docs = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setFetchDocuments({ loading: false, documents: docs });
			});
		} catch (error) {
			console.error('Erro ao buscar documentos:', error);
			setFetchDocuments({ loading: false, error: error.message });
		}
	}, [docCollection, search, uid, cancel]);

	return {
		documents: fetchDocuments.documents,
		loading: fetchDocuments.loading,
		error: fetchDocuments.error,
		loadDocuments,
		cancel,
	};
};
