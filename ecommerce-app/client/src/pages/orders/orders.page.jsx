import { useSelector, useDispatch } from 'react-redux';

// Redux

// Components
import OrderItem from '../../components/orders/order-item/order-item.component';

import classes from './orders.styles.module.css';

const Orders = () => {
	return (
		<div className={classes['orders-list']}>
			<OrderItem date="December 12th, 2022" totalPrice={12.99} id={1} />
		</div>
	);
};

export default Orders;
