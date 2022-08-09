import { createSlice } from '@reduxjs/toolkit';

export const evaluacionSlice = createSlice({
   name: 'evaluacion',
   initialState: {
      evaluacion: [],
      evaluacionActiva: null
   },
   reducers: {
       getEvaluacion: (state, action ) => {
           state.evaluacion = action.payload
        },

       createEvaluacion: (state, action ) => {
           state.evaluacion.push(action.payload)
        },

       activeEvaluacion: (state, action ) => {
           state.evaluacionActiva = action.payload
        },
   }
});


// Action creators are generated for each case reducer function
export const { getEvaluacion, createEvaluacion, activeEvaluacion } = evaluacionSlice.actions;