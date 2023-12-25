import { createSlice } from '@reduxjs/toolkit';
import IUser from '../shared/interfaces/IUser';

const initialUserState: IUser | null = null

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setCurrentUser: (_state, action) => {
            return action.payload;
        },
        clearCurrentUser: (_state) => {
            return initialUserState;
        },
    },
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
