import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import snackbarReducer from './snackbarSlice';
import loaderReducer from './loaderSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        snackbar:snackbarReducer,
        loader:loaderReducer
    },
});

export default store;
