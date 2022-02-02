import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { fetchProducts } from '../../store/actions/products.actions';

// Component
import ProductsList from '../../components/products/products-list/products-list.component';

import classes from './home.styles.module.css';

const Home = props => {
	const dispatch = useDispatch();

	// State (Redux)
	const products = useSelector(state => state.products.products);

	// Effects
	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return (
		<Fragment>
			<ProductsList products={products} />
		</Fragment>
	);
};

export default Home;
