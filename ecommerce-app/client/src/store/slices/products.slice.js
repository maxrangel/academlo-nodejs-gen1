import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	products: [],
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		getProducts: (state, action) => {
			state.products = action.payload.products;
		},
		addProduct: (state, action) => {
			const { newProduct } = action.payload;

			state.products = state.products.concat(newProduct);
		},
	},
});

export const productsActions = productsSlice.actions;

export default productsSlice.reducer;
