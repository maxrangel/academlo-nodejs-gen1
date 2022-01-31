// Components
import ProductCard from '../product-card/product-card.component';

import classes from './products-list.styles.module.css';

const ProductsList = ({ products }) => {
	return (
		<div className={classes.products__list}>
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
		</div>
	);
};

export default ProductsList;
