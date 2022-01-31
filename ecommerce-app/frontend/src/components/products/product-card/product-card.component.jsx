// Components
import Button from '../../UI/button/button.component';

import classes from './product-card.styles.module.css';

const ProductCard = () => {
	return (
		<div className={classes.card}>
			<div className={classes.card__header}>
				<div className={classes.titles}>
					<h3 className={classes.product__title}>Product title</h3>
					<p className={classes.product__seller}>Sold by: Max</p>
				</div>

				<div className={classes['button-container']}>
					{/* TODO: DONT SHOW THIS BUTTON IF THE USER IS THE OWNER OF THE PRODUCT */}
					<Button label="Add to Cart" />
				</div>
			</div>

			<div className={classes.card__body}>
				<p className={classes.product__description}>Product description</p>
				<p className={classes.product__price}>$12.99</p>
			</div>
		</div>
	);
};

export default ProductCard;
