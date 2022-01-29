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
		login: state => {
			state.isAuth = true;
		},
		logout: state => {
			state.isAuth = false;
		},
		signup: state => {},
	},
});

userSlice.actions.login()
export default userSlice.reducer;
