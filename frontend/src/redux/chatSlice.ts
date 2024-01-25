import { createSlice } from '@reduxjs/toolkit';
import {IChat} from "@shared/interfaces/IChat.ts";

const initialState: Partial<IChat> = {}

const chatSlice = createSlice({
    name: 'chat',
    initialState: initialState,
    reducers: {
        openChat: (_state, action) => {
            return action.payload;
        },
        closeChat: (_state) => {
            return initialState;
        },
        addMessage: (state, action) => {
            state.messages!.push(action.payload)
            return state
        }
    },
});

export const {
    openChat,
    closeChat,
    addMessage } = chatSlice.actions;
export default chatSlice.reducer;
