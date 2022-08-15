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

       updateEvaluacion: (state, action ) => {
           state.evaluacion = state.evaluacion.map(e => 
            ( e._id === action.payload?._id ? action.payload : e
           ))
        },
   }
});


// Action creators are generated for each case reducer function
export const { getEvaluacion, createEvaluacion, activeEvaluacion, updateEvaluacion } = evaluacionSlice.actions;