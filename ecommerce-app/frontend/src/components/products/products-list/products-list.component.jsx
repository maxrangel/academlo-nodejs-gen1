// Components
import ProductCard from '../product-card/product-card.component';

import classes from './products-list.styles.module.css';

const ProductsList = ({ products }) => {
	return (
		<div className={classes.products__list}>
			{/* <ProductCard
				name={'Book'}
				description={'An awesome book'}
				price={12.99}
				userId={1}
			/> */}
			{products.map(product => (
				<ProductCard key={`p_${product.name}`} product={product} />
			))}
		</div>
	);
};

export default ProductsList;
