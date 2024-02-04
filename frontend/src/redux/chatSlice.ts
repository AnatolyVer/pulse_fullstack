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
            if (state._id === action.payload.chat_id) state.messages!.push(action.payload.message)
            return state
        }
    },
});

export const {
    openChat,
    closeChat,
    addMessage } = chatSlice.actions;
export default chatSlice.reducer;
