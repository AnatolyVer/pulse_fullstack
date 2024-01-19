import { createSlice } from '@reduxjs/toolkit';
import {IChat} from "@shared/interfaces/IChat.ts";
import IUser from "@shared/interfaces/IUser.ts";

const initialState: Array<IChat | IUser> = []

const chatSlice = createSlice({
    name: 'chatList',
    initialState: initialState,
    reducers: {
        loadChats: (_state, action) => {
            return action.payload;
        },
        addChat: (state, action) => {
            state.push(action.payload)
            return state
        },
        clearChats: () => {
          return initialState
        },
    },
});

export const {
    loadChats,
    addChat,
    clearChats
} = chatSlice.actions;
export default chatSlice.reducer;
