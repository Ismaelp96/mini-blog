import { useCallback, useRef, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig.js';

export const useFetchDocument = (docCollection, id) => {
	const [fetchDocument, setFetchDocument] = useState({
		document: null,
		error: null,
		loading: null,
		cancelled: false,
	});
	const cancelledRef = useRef(false);

	const loadDocument = useCallback(async () => {
		setFetchDocument({ document: null, loading: true, error: null });

		try {
			const docRef = doc(db, docCollection, id);
			const docSnap = await getDoc(docRef);
			if (cancelledRef.current) {
				if (docSnap.exists()) {
					setFetchDocument({
						document: docSnap.data(),
						error: null,
						loading: false,
					});
				} else {
					setFetchDocument({
						document: null,
						error: 'Documento não encontrado.',
						loading: false,
					});
				}
			}

			setFetchDocument({
				loading: false,
				error: null,
				document: docSnap.data(),
			});
		} catch (error) {
			console.error(error);
			setFetchDocument({
				loading: false,
				error: error.message,
				document: null,
			});
		}
	}, [docCollection, id]);

	return {
		document: fetchDocument.document,
		loading: fetchDocument.loading,
		error: fetchDocument.error,
		loadDocument,
	};
};
