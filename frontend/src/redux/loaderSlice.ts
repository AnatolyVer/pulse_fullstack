import { createSlice } from '@reduxjs/toolkit';

const initialState = false

const loaderSlice = createSlice({
    name: 'loader',
    initialState: initialState,
    reducers: {
        showLoader: (_state) => {
            return true
        },
        hideLoader: (_state) => {
            return initialState;
        },
    },
});

export const { showLoader, hideLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
