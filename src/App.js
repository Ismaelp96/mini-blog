import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<div className='container'>
					<Navbar />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/about' element={<About />} />
					</Routes>
					<Footer />
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
