import { createSlice } from '@reduxjs/toolkit';

export const toShowResenaSlice = createSlice({
   name: 'toShowResena',
   initialState: {
      toShowResena: []
   },
   reducers: {
       getToShowResena: (state, action ) => {
           state.toShowResena = action.payload;
        },
       updateToShowResena: (state, action ) => {
           state.toShowResena = state.toShowResena.map(
            e => (e._id === action.payload._id) ? action.payload : e
           );
        },
   }
});


// Action creators are generated for each case reducer function
export const { getToShowResena, updateToShowResena } = toShowResenaSlice.actions;