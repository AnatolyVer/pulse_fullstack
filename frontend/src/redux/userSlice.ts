import { createSlice } from '@reduxjs/toolkit';
import IUser from '../shared/interfaces/IUser';

const initialUserState: IUser = {
    _id: '',
    nickname: '',
    username: '',
    avatar_url: '',
    bio: '',
    chats: [],
};


const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setCurrentUser: (state, action) => {
            return action.payload;
        },
        clearCurrentUser: (state) => {
            return initialUserState;
        },
    },
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
