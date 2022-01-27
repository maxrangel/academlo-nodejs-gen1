import { Fragment } from 'react';

// Component
import NavHeader from '../../components/UI/nav-header/nav-header.component';
import ProductCard from '../../components/products/product-card/product-card.component';

import classes from './home.styles.module.css';

const Home = ({ onLogout }) => {
	return (
		<Fragment>
			<NavHeader />

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
