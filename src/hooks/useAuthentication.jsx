import '../firebase/firebaseConfig.js';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
	signOut,
	signInWithEmailAndPassword,
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

	const createUser = async (data) => {
		checkIfIsCancelled();
		setAuthentication({ loading: true, error: null });

		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password,
			);

			await updateProfile(user, {
				displayName: data.displayName,
			});
			setAuthentication({ loading: false, error: null });
			return user;
		} catch (error) {
			let customError;

			if (error.code === 'auth/email-already-in-use') {
				customError =
					'Este e-mail já está em uso. Tente fazer login ou use outro e-mail.';
			} else if (error.code === 'auth/weak-password') {
				customError = 'A senha é muito fraca. Use pelo menos 6 caracteres.';
			} else {
				customError = 'Ocorreu um erro ao criar a conta. Tente novamente.';
			}
			console.error('Erro ao criar usuário:', error);
			setAuthentication({ error: customError, loading: false });
			return null;
		}
	};

	const loginUser = async (data) => {
		checkIfIsCancelled();
		setAuthentication({ loading: true, error: null });
		try {
			const user = await signInWithEmailAndPassword(
				auth,
				data.email,
				data.password,
			);
			setAuthentication({ loading: false, error: null });
			return user;
		} catch (error) {
			const invalidCredential = error.message.includes(
				'auth/invalid-credential',
			);
			let customError;
			if (invalidCredential) {
				customError = 'Email ou senha está incorreto.';
			} else {
				customError =
					'Ocorreu um erro ao fazer login. Tente novamente mais tarde!';
			}

			console.error('Erro ao fazer login:', error);
			setAuthentication({ error: customError, loading: false });
			return null;
		}
	};

	const logout = () => {
		checkIfIsCancelled();
		signOut(auth);
	};

	useEffect(() => {
		return () => setAuthentication((prev) => ({ ...prev, cancelled: true }));
	}, []);

	return {
		auth,
		createUser,
		error: authentication.error,
		loading: authentication.loading,
		loginUser,
		logout,
	};
};
