import axios from 'axios';

import { userActions } from '../slices/user.slice';

export const login = (email, password) => {
	return async dispatch => {
		try {
			// https://ecommerce-academlo-gen1.herokuapp.com/api/v1/users/login
			const response = await axios.post(
				`/api/v1/users/login`,
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
