import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userId: null,
	isAuth: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			state.isAuth = true;
			state.userId = action.payload.userId;
		},
		logout: state => {
			state.isAuth = false;
		},
		signup: (state, action) => {},
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
