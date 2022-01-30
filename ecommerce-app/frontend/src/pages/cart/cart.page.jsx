import { useDispatch, useSelector } from 'react-redux';

// Redux

// Componets
import CartItem from '../../components/cart/cart-item/cart-item.component';

import classes from './cart.styles.module.css';

const Cart = () => {
	return (
		<div className={classes['cart-list']}>
			<h2>Your cart</h2>
			<CartItem />
			<CartItem />
			<CartItem />
			<CartItem />
		</div>
	);
};

export default Cart;
