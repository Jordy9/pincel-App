import { createSlice } from '@reduxjs/toolkit';

export const comunicadoSlice = createSlice({
   name: 'comunicado',
   initialState: {
      comunicados: []
   },
   reducers: {
       getComunicado: (state, action ) => {
           state.comunicados = action.payload;
        },
   }
});


// Action creators are generated for each case reducer function
export const { getComunicado } = comunicadoSlice.actions;