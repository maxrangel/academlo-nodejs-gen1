import classes from './button.styles.module.css';

interface ButtonProps {
	onClick: () => void;
	label: string;
	type?: 'submit' | 'button' | 'reset';
}

const Button = ({ onClick, label, type }: ButtonProps) => {
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
