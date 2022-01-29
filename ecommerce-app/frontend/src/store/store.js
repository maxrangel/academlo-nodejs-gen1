import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers/root.reducer';

const store = configureStore({ reducer: rootReducer });

export default store;
