import { createSlice } from '@reduxjs/toolkit';
import IUser from '../shared/interfaces/IUser';

const initialUserState: Partial<IUser> = {}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
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
