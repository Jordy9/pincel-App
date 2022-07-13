import { createSlice } from '@reduxjs/toolkit';

export const messageSlice = createSlice({
   name: 'message',
   initialState: {
        Respond: false,
        messageRespond: null,
        messageOutGoing: ''
   },
   reducers: {
        respondMessage: (state, action ) => {
            state.Respond = true;
            state.messageRespond = action.payload;
        },

        stopRespondMessage: (state ) => {
            state.Respond = false;
            state.messageRespond = null;
        },

        scrollMessageClear: (state ) => {
            state.messageOutGoing = '';
        },

        scrollMessageOutGoing: (state, action ) => {
            state.messageOutGoing = action.payload;
        },
   }
});


// Action creators are generated for each case reducer function
export const { respondMessage, scrollMessageClear, scrollMessageOutGoing, stopRespondMessage } = messageSlice.actions;