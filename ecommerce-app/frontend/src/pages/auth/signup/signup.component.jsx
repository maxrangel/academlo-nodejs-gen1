import { useRef } from 'react';
import { useDispatch } from 'react-redux';

// Redux
import { signup } from '../../../store/actions/user.actions';

// Components
import Input from '../../../components/UI/input/input.component';
import Button from '../../../components/UI/button/button.component';
import FormContainer from '../../../components/UI/form-container/form-container.component';

import classes from './signup.styles.module.css';

const SignUp = ({ showLoginForm }) => {
	const dispatch = useDispatch();

	// Refs
	const usernameInputRef = useRef();
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const onSubmitHandler = e => {
		e.preventDefault();

		const usernameValue = usernameInputRef.current.value;
		const emailValue = emailInputRef.current.value;
		const passwordValue = passwordInputRef.current.value;

		if (
			!emailValue.includes('@') ||
			passwordValue.trim().length < 8 ||
			usernameValue.trim().length === 0
		) {
			return;
		}

		const userData = {
			name: usernameValue,
			email: emailValue,
			password: passwordValue,
		};

		dispatch(signup(userData));
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
					input={{ id: 'username', type: 'text', ref: usernameInputRef }}
				/>
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
