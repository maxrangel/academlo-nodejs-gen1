import { useRef, useState } from 'react';

// Components
import Button from '../../UI/button/button.component';

import classes from './cart-item.styles.module.css';

const CartItem = ({ product }) => {
	const { name, requestedQty, price } = product;

	// State
	const [updateQty, setUpdateQty] = useState(requestedQty);

	// Refs
	const updateQtyInputRef = useRef();

	// Handlers
	const onUpdateInputChangeHandler = () => {
		const updateQty = +updateQtyInputRef.current.value;

		if (updateQty < 0) return;

		setUpdateQty(updateQty);
	};

	const onUpdateProductHandler = () => {
		// TODO: SEND API REQUEST AND UPDATE STATE
	};

	return (
		<div className={classes['cart-item']}>
			<div className={classes['cart-item__product']}>
				<h3>{name}</h3>
				<p>Quantity: {requestedQty}</p>
				<p>${+price.toFixed(2)}</p>
			</div>
			<div className={classes['cart-item__actions']}>
				<input
					type="number"
					value={updateQty}
					onChange={onUpdateInputChangeHandler}
					ref={updateQtyInputRef}
					className={classes['update-qty-input']}
				/>
				<Button type="button" onClick={onUpdateProductHandler} label="Update" />
				<Button type="button" label="Remove" />
			</div>
		</div>
	);
};

export default CartItem;
