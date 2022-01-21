import { Fragment } from 'react';

// Component
import NavHeader from '../../components/UI/nav-header/nav-header.component';

import classes from './home.styles.module.css';

const Home = ({ onLogout }) => {
	return (
		<Fragment>
			<NavHeader />
		</Fragment>
	);
};

export default Home;
