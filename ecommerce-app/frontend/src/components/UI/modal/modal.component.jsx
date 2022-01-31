import { Fragment } from 'react';
import { createPortal } from 'react-dom';

import classes from './modal.styles.module.css';

const Backdrop = ({ onClick }) => {
	return <div onClick={onClick} className={classes.backdrop}></div>;
};

const ModalOverlay = ({ children }) => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{children}</div>
		</div>
	);
};

const portalElement = document.getElementById('overlays');

const Modal = ({ children, onClick }) => {
	return (
		<Fragment>
			{createPortal(<Backdrop onClick={onClick} />, portalElement)}
			{createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
		</Fragment>
	);
};

export default Modal;
