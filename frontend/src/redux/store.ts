import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        user: userReducer, // Добавьте ваш редьюсер в хранилище под ключом "user"
        // Другие редьюсеры могут быть добавлены здесь
    },
});

export default store;
