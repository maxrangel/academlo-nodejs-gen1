import axios from 'axios';

import { userActions } from '../slices/user.slice';

export const login = (email, password) => {
	return async dispatch => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/users/login`,
				{
					email,
					password,
				}
			);

			const { user, token } = response.data.data;

			sessionStorage.setItem('token', token);

			dispatch(userActions.login({ userId: user.id, token }));
		} catch (error) {
			console.log(error);
		}
	};
};

export const signup = userData => {
	return async dispatch => {
		try {
			dispatch(userActions.signup({ userData }));
		} catch (error) {
			console.log(error);
		}
	};
};

export const checkUserAuth = token => {
	return dispatch => {
		dispatch(userActions.checkAuth({ userAuth: !!token, token }));
	};
};
