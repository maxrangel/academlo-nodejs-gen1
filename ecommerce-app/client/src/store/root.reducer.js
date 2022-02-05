// Reducers
import userReducer from './slices/user.slice';
import productsReducer from './slices/products.slice';
import cartReducer from './slices/cart.slice';

const rootReducer = {
	user: userReducer,
	products: productsReducer,
	cart: cartReducer,
};

export default rootReducer;
