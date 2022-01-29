import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	selectedProducts: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProductToCart: state => {},
		updateProductInCart: state => {},
		removeProductFromCart: state => {},
	},
});

export default cartSlice.reducer;
