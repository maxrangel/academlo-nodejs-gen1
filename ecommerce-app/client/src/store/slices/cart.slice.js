import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	selectedProducts: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		getCart: (state, action) => {
			state.selectedProducts = action.payload.cartProducts;
		},
		updateProductInCart: state => {},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
