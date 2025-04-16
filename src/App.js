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
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';

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
			<AuthProvider value={{ user }}>
				<BrowserRouter>
					<Navbar />
					<div className='container'>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/about' element={<About />} />
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Register />} />
							<Route path='/post/create' element={<CreatePost />} />
							<Route path='/dashboard' element={<Dashboard />} />
						</Routes>
					</div>
					<Footer />
				</BrowserRouter>
			</AuthProvider>
		</div>
	);
}

export default App;
