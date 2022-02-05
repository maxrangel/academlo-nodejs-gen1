import { useRef } from 'react';

// Components
import Modal from '../../UI/modal/modal.component';
import Button from '../../UI/button/button.component';
import Input from '../../UI/input/input.component';

import classes from './update-form-modal.style.module.css';

const UpdateFormModal = ({ onClose, currentUsername, currentEmail }) => {
	const usernameInputRef = useRef();
	const emailInputRef = useRef();

	// Handlers
	const onSubmitHandler = () => {};

	return (
		<Modal onClick={onClose}>
			<form className={classes.form} onSubmit={onSubmitHandler}>
				<h3>You can update your profile here</h3>
				<Input
					label="Username"
					input={{
						type: 'text',
						ref: usernameInputRef,
						placeholder: currentUsername,
					}}
				/>
				<Input
					label="Email"
					input={{
						type: 'email',
						ref: emailInputRef,
						placeholder: currentEmail,
					}}
				/>
			</form>

			<div className={classes.actions}>
				<Button type="submit" label="Update" />
				<Button type="button" onClick={onClose} label="Cancel" />
			</div>
		</Modal>
	);
};

export default UpdateFormModal;
