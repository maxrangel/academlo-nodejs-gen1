import { useRef } from 'react';

// Components
import Input from '../../../components/UI/input/input.component';
import Button from '../../../components/UI/button/button.component';
import FormContainer from '../../../components/UI/form-container/form-container.component';

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
		<FormContainer>
			<form className={classes.form} onSubmit={onSubmitHandler}>
				<h3 className={classes.form__title}>Log In</h3>
				<p className={classes.form__subtitle}>Enter your email and password</p>
				<Input
					label="Email"
					ref={emailInputRef}
					input={{ id: 'email', type: 'email' }}
				/>
				<Input
					label="Password"
					ref={passwordInputRef}
					input={{
						id: 'password',
						type: 'password',
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
		</FormContainer>
	);
};

export default Login;
