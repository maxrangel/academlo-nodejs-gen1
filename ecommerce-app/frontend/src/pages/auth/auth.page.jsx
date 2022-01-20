import { Fragment, useState } from 'react';

// Components
import Login from './login/login.component';
import SignUp from './signup/signup.component';

import classes from './auth.styles.module.css';

const Auth = ({ onLogin, onSignup }) => {
	const [showLoginForm, setShowLoginForm] = useState(true);

	const showLoginHandler = () => {
		setShowLoginForm(true);
	};

	const showSignupHandler = () => {
		setShowLoginForm(false);
	};

	return (
		<Fragment>
			{showLoginForm ? (
				<Login showSignupForm={showSignupHandler} onLogin={onLogin} />
			) : (
				<SignUp showLoginForm={showLoginHandler} />
			)}
		</Fragment>
	);
};

export default Auth;
