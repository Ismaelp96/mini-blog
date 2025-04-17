import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAuthValue } from '../../context/AuthContext';
import { useAuthentication } from '../../hooks/useAuthentication';

const Navbar = () => {
	const { user } = useAuthValue();
	const { logout } = useAuthentication();

	const isActive = ({ isActive }) => (isActive ? styles.active : '');

	return (
		<header className={styles.header}>
			<nav className={styles.navbar}>
				<NavLink to='/' className={styles.brand}>
					Mini <span>Blog</span>
				</NavLink>
				<ul className={styles.links_list}>
					<li>
						<NavLink to='/' className={isActive}>
							Home
						</NavLink>
					</li>
					{!user && (
						<>
							<li>
								<NavLink to='/login' className={isActive}>
									Entrar
								</NavLink>
							</li>
							<li>
								<NavLink to='/register' className={isActive}>
									Cadastrar
								</NavLink>
							</li>
						</>
					)}
					{user && (
						<>
							<li>
								<NavLink to='/dashboard' className={isActive}>
									Dashboard
								</NavLink>
							</li>
							<li>
								<NavLink to='/post/create' className={isActive}>
									Novo Post
								</NavLink>
							</li>
						</>
					)}
					<li>
						<NavLink to='/about' className={isActive}>
							Sobre
						</NavLink>
					</li>
					{user && (
						<li>
							<button onClick={logout} className='btn-outline'>
								Sair
							</button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
