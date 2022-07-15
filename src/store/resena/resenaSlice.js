import { createSlice } from '@reduxjs/toolkit';

export const resenaSlice = createSlice({
   name: 'resena',
   initialState: {
      resena: []
   },
   reducers: {
       getResena: (state, action ) => {
           state.resena = action.payload;
        },

       createResena: (state, action ) => {
           state.resena.push(action.payload)
        },

       UpdateResena: (state, action ) => {
            state.resena = state.resena.map(
                e => e._id === action.payload._id ? action.payload : e
            );
        },
   }
});


// Action creators are generated for each case reducer function
export const { getResena, createResena, UpdateResena } = resenaSlice.actions;