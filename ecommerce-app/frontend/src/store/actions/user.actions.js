import axios from 'axios';

import { userActions } from '../slices/user.slice';

export const login = (email, password) => {
	return async dispatch => {
		try {
			dispatch(userActions.login());
		} catch (error) {
			console.log(error);
		}
	};
};
