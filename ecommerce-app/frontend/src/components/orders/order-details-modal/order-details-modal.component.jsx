import { useEffect, useState } from 'react';
import axios from 'axios';

// Components
import Modal from '../../UI/modal/modal.component';

import classes from './order-details-modal.styles.module.css';

const OrderDetailsModal = ({ onClose, id }) => {
	// State
	const [orderProducts, setOrderProducts] = useState([]);

	const fetchOrderDetails = async () => {
		try {
			setOrderProducts([]);
		} catch (error) {
			console.log(error);
		}
	};

	// Effects
	useEffect(() => {
		fetchOrderDetails();
	}, []);

	return (
		<Modal onClick={onClose}>
			<div className={classes['details__header']}>
				<h2>Your order was for a total: $12.99</h2>
			</div>

			<div className={classes['details__items']}>
				<div className={classes.item}>
					<p className={classes['item__name']}>Product name</p>
					<p className={classes['item__qty']}>Requested qty</p>
					<p className={classes['item__price']}>Unitary Price</p>
				</div>
			</div>
		</Modal>
	);
};

export default OrderDetailsModal;
