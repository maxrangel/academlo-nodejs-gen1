import { useState } from 'react';

// Components
import Button from '../../UI/button/button.component';
import OrderDetailsModal from '../order-details-modal/order-details-modal.component';

import classes from './order-item.styles.module.css';

const OrderItem = ({ date, totalPrice, orderId }) => {
	// State
	const [showModal, setShowModal] = useState(false);

	// Handlers
	const onOpenModal = () => {
		setShowModal(true);
	};

	const onCloseModal = () => {
		setShowModal(false);
	};

	return (
		<div className={classes['order-item']}>
			<h3>{date}</h3>
			<p className={classes['order-item__price']}>
				Total: ${+totalPrice.toFixed(2)}
			</p>

			<div className={classes['order-item__button']}>
				<Button onClick={onOpenModal} label="View order" type="button" />
			</div>

			{showModal && <OrderDetailsModal id={orderId} onClose={onCloseModal} />}
		</div>
	);
};

export default OrderItem;
