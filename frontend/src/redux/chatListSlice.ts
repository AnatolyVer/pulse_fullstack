import { createSlice } from '@reduxjs/toolkit';
import {IPreviewChat} from "@shared/interfaces/IChat.ts";

const initialState: Array<IPreviewChat> = []

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
        changeLastMessage: (state, action) => {
            const { chat_id, message } = action.payload;
            const updatedChat = state.find((chat: IPreviewChat) => chat?._id === chat_id);
            if (updatedChat) {
                updatedChat.last_message = message
            }
            return state;
        }

    },
});

export const {
    loadChats,
    addChat,
    clearChats,
    changeLastMessage
} = chatSlice.actions;
export default chatSlice.reducer;
