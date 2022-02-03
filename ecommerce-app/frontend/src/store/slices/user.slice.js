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
			state.userId = action.payload.userId;
			state.token = action.payload.token;
		},
		logout: state => {
			state.isAuth = false;
		},
		signup: (state, action) => {},
		checkAuth: (state, action) => {
			state.isAuth = action.payload.userAuth;
			state.token = action.payload.token;
		},
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
