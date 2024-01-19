import {combineReducers, configureStore} from '@reduxjs/toolkit';

import userReducer from './userSlice';
import snackbarReducer from './snackbarSlice';
import loaderReducer from './loaderSlice'
import chatReducer from './chatSlice'
import chatListReducer from "@redux/chatListSlice.ts";

const rootReducer = combineReducers({
    user: userReducer,
    snackbar: snackbarReducer,
    loader: loaderReducer,
    chat: chatReducer,
    chatList:chatListReducer
});

const store = configureStore({
    reducer:rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
