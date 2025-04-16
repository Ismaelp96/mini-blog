import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';

import './App.css';
import { useAuthentication } from './hooks/useAuthentication';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {
	const [user, setUser] = useState(undefined);
	const { auth } = useAuthentication();

	const loadingUser = user === undefined;

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user);
		});
	}, [auth]);

	if (loadingUser) {
		return <p>Carregando...</p>;
	}

	return (
		<div className='App'>
			<AuthProvider>
				<BrowserRouter>
					<Navbar />
					<div className='container'>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/about' element={<About />} />
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Register />} />
						</Routes>
					</div>
					<Footer />
				</BrowserRouter>
			</AuthProvider>
		</div>
	);
}

export default App;
