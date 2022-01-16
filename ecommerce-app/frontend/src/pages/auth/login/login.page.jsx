import classes from './login.styles.module.css';

const Login = ({ onLogin }) => {
	return (
		<div>
			<button onClick={onLogin}>Log In</button>
		</div>
	);
};

export default Login;
