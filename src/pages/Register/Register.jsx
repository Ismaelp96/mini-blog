import { useState } from 'react';
import styles from './Register.module.css';
const Register = () => {
	const [register, setRegister] = useState({
		displayName: '',
		email: '',
		password: '',
		confirmPassword: '',
		error: '',
	});
	const validatedPassword = register.password !== register.confirmPassword;
	const handleSubmit = (e) => {
		e.preventDefault();
		setRegister({ ...register, error: '' });
		const user = {
			displayName: register.displayName,
			email: register.email,
			password: register.password,
		};
		if (validatedPassword) {
			setRegister({ ...register, error: 'As senhas devem ser iguais' });
			return;
		}
		console.log(user);
	};
	return (
		<div className={styles.register}>
			<h1>Cadastre-se para postar</h1>
			<p>Crie seu usuário e compartilhe suas histórias</p>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Nome:</span>
					<input
						type='text'
						name='displayName'
						required
						placeholder='Nome do usuário'
						autoComplete='name'
						value={register.displayName}
						onChange={(e) =>
							setRegister({ ...register, displayName: e.target.value })
						}
					/>
				</label>
				<label>
					<span>E-mail:</span>
					<input
						type='email'
						name='email'
						required
						placeholder='E-mail do usuário'
						autoComplete='email'
						value={register.email}
						onChange={(e) =>
							setRegister({ ...register, email: e.target.value })
						}
					/>
				</label>
				<label>
					<span>Senha:</span>
					<input
						type='password'
						name='password'
						required
						placeholder='Insira sua senha'
						autoComplete='new-password'
						value={register.password}
						onChange={(e) =>
							setRegister({ ...register, password: e.target.value })
						}
					/>
				</label>
				<label>
					<span>Confirmação de senha:</span>
					<input
						type='password'
						name='confirmPassword'
						required
						placeholder='Confirme sua senha novamente'
						autoComplete='new-password'
						value={register.confirmPassword}
						onChange={(e) =>
							setRegister({ ...register, confirmPassword: e.target.value })
						}
					/>
				</label>
				<button className='btn'>Cadastrar</button>
				{register.error && (
					<div className='error'>
						<p>{register.error}</p>
					</div>
				)}
			</form>
		</div>
	);
};

export default Register;
