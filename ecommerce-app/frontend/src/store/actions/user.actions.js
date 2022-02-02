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

			dispatch(userActions.login({ userId: response.data.data.user.id }));
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
