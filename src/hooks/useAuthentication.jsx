import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
} from 'firebase/auth';

import { useEffect, useState } from 'react';

export const useAuthentication = () => {
	const [authentication, setAuthentication] = useState({
		error: null,
		loading: null,
		cancelled: false,
	});
	const auth = getAuth();
	function checkIfIsCancelled() {
		if (authentication.cancelled) {
			return;
		}
	}
};
