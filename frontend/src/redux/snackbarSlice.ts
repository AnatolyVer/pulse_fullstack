import { createSlice } from '@reduxjs/toolkit';
import { ISnackBar } from '@shared/interfaces/ISnackBar';


const initialState: ISnackBar = {
    open:false,
    text:null
}

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: initialState,
    reducers: {
        openSnackbar: (_state, action) => {
            return action.payload;
        },
        closeSnackbar: (_state) => {
            return initialState;
        },
    },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
