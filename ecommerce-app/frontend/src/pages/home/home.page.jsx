import classes from './home.styles.module.css';

const Home = ({ onLogout }) => {
	return (
		<div>
			<h1>Home</h1>
			<button onClick={onLogout}>Logout</button>
		</div>
	);
};

export default Home;
