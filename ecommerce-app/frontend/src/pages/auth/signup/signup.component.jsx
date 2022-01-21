import { useRef } from 'react';

// Components
import Input from '../../../components/UI/input/input.component';
import Button from '../../../components/UI/button/button.component';
import FormContainer from '../../../components/UI/form-container/form-container.component';

import classes from './signup.styles.module.css';

const SignUp = ({ showLoginForm }) => {
	// Refs
	const usernameInputRef = useRef();
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const onSubmitHandler = e => {
		e.preventDefault();
	};

	return (
		<FormContainer>
			<form className={classes.form} onSubmit={onSubmitHandler}>
				<h3 className={classes.form__title}>Create account</h3>
				<p className={classes.form__subtitle}>
					To create an account, enter a username, email and password
				</p>
				<Input
					label="Username"
					ref={usernameInputRef}
					input={{ id: 'username', type: 'text' }}
				/>
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
					<Button label="Create account" type="submit" />
					<Button
						onClick={showLoginForm}
						label="Already have an account? Log In"
						type="button"
					/>
				</div>
			</form>
		</FormContainer>
	);
};

export default SignUp;
