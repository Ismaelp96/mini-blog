import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
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
					<li>
						<NavLink to='/about' className={isActive}>
							Sobre
						</NavLink>
					</li>
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
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
