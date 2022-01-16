import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Pages
import Home from './pages/home/home.page';
import Login from './pages/auth/login/login.page';
import SignUp from './pages/auth/signup/signup.page';

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

	const signupHandler = (name, email, password) => {
		console.log('Signin user in!');
	};

	return (
		<div>
			<Routes>
				<Route
					index
					path="/"
					element={
						isAuth ? (
							<Home onLogout={logoutHandler} />
						) : (
							<Navigate to="/login" />
						)
					}
				/>

				<Route path="/login" element={<Login onLogin={loginHandler} />} />
				<Route path="/signup" element={<SignUp onSignup={signupHandler} />} />
				{/* <Route path="/auth"></Route> */}
			</Routes>
		</div>
	);
};

export default App;
