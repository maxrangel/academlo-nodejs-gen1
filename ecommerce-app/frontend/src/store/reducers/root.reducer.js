import { combineReducers } from 'redux';

// Reducers
import userReducer from './user.reducer';
import productsReducer from './products.reducer';
import cartReducer from './cart.reducer';

const rootReducer = combineReducers({
	userReducer,
	productsReducer,
	cartReducer,
});

export default rootReducer;
