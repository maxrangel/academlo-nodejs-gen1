import classes from './button.styles.module.css';

const Button = ({ onClick, label, type }) => {
	return (
		<button
			className={classes.button}
			onClick={onClick}
			type={type || 'submit'}
		>
			{label}
		</button>
	);
};

export default Button;
