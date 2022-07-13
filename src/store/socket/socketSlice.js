import { createSlice } from '@reduxjs/toolkit';

export const socketSlice = createSlice({
   name: 'socket',
   initialState: {
      socket: null
   },
   reducers: {
        startSocket: (state, action ) => {

           state.socket = action.payload;
       },
   }
});


// Action creators are generated for each case reducer function
export const { startSocket } = socketSlice.actions;