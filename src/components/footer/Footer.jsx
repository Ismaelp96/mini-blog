import styles from './Footer.module.css';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<h3 className={styles.title_footer}>
				Escreva sobre o que você tem interesse!
			</h3>
			<p className={styles.p_footer}>Mini Blog &copy; 2025</p>
		</footer>
	);
};

export default Footer;
