import { useEffect, useState } from 'react';
import styles from './Login.module.css';
import { useAuthentication } from '../../hooks/useAuthentication';
const Login = () => {
	const [login, setLogin] = useState({
		email: '',
		password: '',
		error: '',
	});

	const { createUser, error: authError, loading } = useAuthentication();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLogin({ ...login, error: '' });
		const user = {
			email: login.email,
			password: login.password,
		};

		const res = await createUser(user);
		return res;
	};

	useEffect(() => {
		if (authError) {
			setLogin((prev) => ({ ...prev, error: authError }));
		}
	}, [authError]);

	return (
		<div className={styles.login}>
			<h1>ENTRAR</h1>
			<p>
				Faça o login para acessar o Mini <span>Blog</span>
			</p>
			<form onSubmit={handleSubmit}>
				<label>
					<span>E-mail:</span>
					<input
						type='email'
						name='email'
						required
						placeholder='E-mail do usuário'
						autoComplete='email'
						value={login.email}
						onChange={(e) => setLogin({ ...login, email: e.target.value })}
					/>
				</label>
				<label>
					<span>Senha:</span>
					<input
						type='password'
						name='password'
						required
						placeholder='Insira sua senha'
						autoComplete='password'
						value={login.password}
						onChange={(e) => setLogin({ ...login, password: e.target.value })}
					/>
				</label>
				{!loading && <button className='btn'>Entrar</button>}
				<button className='btn-outline'>Cadastrar</button>
				{loading && (
					<button className='btn' disabled>
						Aguarde...
					</button>
				)}
				{login.error && (
					<div className='error'>
						<p>{login.error}</p>
					</div>
				)}
			</form>
		</div>
	);
};

export default Login;
