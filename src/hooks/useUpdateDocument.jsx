import { db } from '../firebase/firebaseConfig.js';
import { doc, updateDoc } from 'firebase/firestore';
import { useState, useEffect, useReducer } from 'react';

const initalState = {
	loading: null,
	error: null,
};

const editReducer = (state, action) => {
	switch (action.type) {
		case 'LOADING':
			return { loading: true, error: null };
		case 'UPDATED_DOC':
			return { loading: false, error: null };
		case 'ERROR':
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const useEditDocument = (docCollection) => {
	const [response, dispatch] = useReducer(editReducer, initalState);
	const [cancelled, setCancelled] = useState(false);

	const checkCancelBeforeDispatch = (action) => {
		if (!cancelled) {
			dispatch(action);
		}
	};

	const updateDocument = async (id, document) => {
		checkCancelBeforeDispatch({
			type: 'LOADING',
		});
		try {
			const updatedDocument = await updateDoc(
				doc(db, docCollection, id),
				document,
			);
			checkCancelBeforeDispatch({
				type: 'UPDATED_DOC',
				payload: updatedDocument,
			});
		} catch (error) {
			checkCancelBeforeDispatch({
				type: 'ERROR',
				payload: error.message,
			});
		}
	};

	useEffect(() => {
		return () => setCancelled(true);
	}, []);
	return { updateDocument, response };
};
