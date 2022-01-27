import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Pages
import Home from './pages/home/home.page';
import Auth from './pages/auth/auth.page';
import AddProduct from './pages/add-product/add-product.page';

import './App.css';

const App = () => {
	const [isAuth, setIsAuth] = useState(false);
	const navigate = useNavigate();

	const loginHandler = (email, password) => {
		setIsAuth(true);
		navigate('/');
	};

	const logoutHandler = userId => {
		setIsAuth(false);
		// navigate('/login');
	};

	const signupHandler = (email, password) => {
		console.log('Signin user in!');
	};

	return (
		<div className="app">
			<Routes>
				<Route
					index
					path="/"
					element={
						isAuth ? <Home onLogout={logoutHandler} /> : <Navigate to="/auth" />
					}
				/>

				<Route path="/add-product" element={<AddProduct />} />

				<Route
					path="/auth"
					element={<Auth onLogin={loginHandler} onSignup={signupHandler} />}
				/>
			</Routes>
		</div>
	);
};

export default App;
