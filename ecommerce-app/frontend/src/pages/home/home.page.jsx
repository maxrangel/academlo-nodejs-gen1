import { Fragment } from 'react';

// Component
import ProductsList from '../../components/products/products-list/products-list.component';

import classes from './home.styles.module.css';

const Home = props => {
	return (
		<Fragment>
			<ProductsList products={[]} />
		</Fragment>
	);
};

export default Home;
