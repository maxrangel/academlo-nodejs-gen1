import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userId: null,
	isAuth: false,
	token: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			state.isAuth = true;
		},
		logout: state => {
			state.isAuth = false;
		},
		signup: state => {},
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
