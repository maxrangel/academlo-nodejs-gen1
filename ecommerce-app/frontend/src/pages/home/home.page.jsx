import { Fragment, useEffect } from 'react';

// Component
import ProductCard from '../../components/products/product-card/product-card.component';

import classes from './home.styles.module.css';

const Home = props => {
	return (
		<Fragment>
			<div className={classes.products__list}>
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
			</div>
		</Fragment>
	);
};

export default Home;
