import { createSlice } from '@reduxjs/toolkit';

export const socketSlice = createSlice({
   name: 'socket',
   initialState: {
      socket: null,
      online: null
   },
   reducers: {
      startSocket: (state, action ) => {
         state.socket = action.payload.socket;
         state.online = action.payload.online;
      },
   }
});


// Action creators are generated for each case reducer function
export const { startSocket } = socketSlice.actions;