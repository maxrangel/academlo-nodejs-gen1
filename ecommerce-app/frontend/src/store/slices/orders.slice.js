import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	orders: [],
};

const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		getOrders: (state, action) => {},
	},
});

export const ordersActions = ordersSlice.actions;

export default ordersSlice.reducer;
