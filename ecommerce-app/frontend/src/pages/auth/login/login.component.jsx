import { useRef } from 'react';

// Components
import Input from '../../../components/UI/input/input.component';
import Button from '../../../components/UI/button/button.component';

import classes from './login.styles.module.css';

const Login = ({ onLogin, showSignupForm }) => {
	// Refs
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const onSubmitHandler = e => {
		e.preventDefault();

		onLogin();
	};

	return (
		<div className={classes.login}>
			<form className={classes.form} onSubmit={onSubmitHandler}>
				<h3 className={classes.login__title}>Log In</h3>
				<p className={classes.login__subtitle}>Enter your email and password</p>
				<Input
					label="Email"
					input={{ id: 'email', type: 'email', ref: emailInputRef }}
				/>
				<Input
					label="Password"
					input={{
						id: 'password',
						type: 'password',
						ref: passwordInputRef,
					}}
				/>

				<div className={classes.form__actions}>
					<Button label="Log In" type="submit" />
					<Button
						onClick={showSignupForm}
						label="Create account"
						type="button"
					/>
				</div>
			</form>
		</div>
	);
};

export default Login;
