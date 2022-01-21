import classes from './form-container.styles.module.css';

const FormContainer = ({ children }) => {
	return <div className={classes.container}>{children}</div>;
};

export default FormContainer;
