import { useRef } from 'react';
// Buttons
import Input from '../../UI/input/input.component';
import Button from '../../UI/button/button.component';

import classes from './cart-item.styles.module.css';

const CartItem = () => {
	const updateQtyInputRef = useRef();

	return (
		<div className={classes['cart-item']}>
			<div className={classes['cart-item__product']}>
				<h3>Product name</h3>
				<p>Quantity: Requested qty</p>
				<p>$12.99</p>
			</div>
			<div className={classes['cart-item__actions']}>
				<input
					type="number"
					ref={updateQtyInputRef}
					className={classes['update-qty-input']}
				/>
				<Button type="button" label="Update" />
				<Button type="button" label="Remove" />
			</div>
		</div>
	);
};

export default CartItem;
