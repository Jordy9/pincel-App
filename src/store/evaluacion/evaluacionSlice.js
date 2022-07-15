import { createSlice } from '@reduxjs/toolkit';

export const evaluacionSlice = createSlice({
   name: 'evaluacion',
   initialState: {
      evaluacion: []
   },
   reducers: {
       getevaluacion: (state, action ) => {
           state.evaluacion = action.payload;
        },

       createevaluacion: (state, action ) => {
           state.evaluacion.push(action.payload)
        },

       actualizarevaluacion: (state, action ) => {
            state.evaluacion = state.evaluacion.map(
                e => e._id === action.payload._id ? action.payload : e
            );
        },
   }
});


// Action creators are generated for each case reducer function
export const { getevaluacion, createevaluacion, actualizarevaluacion } = evaluacionSlice.actions;