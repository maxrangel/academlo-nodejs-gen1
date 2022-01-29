import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Pages
import Home from './pages/home/home.page';
import Auth from './pages/auth/auth.page';
import AddProduct from './pages/add-product/add-product.page';
import Cart from './pages/cart/cart.page';
import Orders from './pages/orders/orders.page';
import Profile from './pages/profile/profile.page';
import Sales from './pages/sales/sales.page';

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
				{/* {!isAuth ? <Navigate to="/auth" /> : <Navigate to="/home" />} */}

				<Route index path="/" element={<Home onLogout={logoutHandler} />} />
				<Route
					path="/auth"
					element={<Auth onLogin={loginHandler} onSignup={signupHandler} />}
				/>
				<Route path="/add-product" element={<AddProduct />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/orders" element={<Orders />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/sales" element={<Sales />} />
			</Routes>
		</div>
	);
};

export default App;
