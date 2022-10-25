import { createSlice } from '@reduxjs/toolkit';

export const evaluacionSlice = createSlice({
   name: 'evaluacion',
   initialState: {
      evaluacion: [],
      evaluacionActiva: null,
      evaluacionFilterSlice: [],
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

      filterEvaluacionSlice: (state, action) => {
         state.evaluacionFilterSlice = action.payload
      },
   }
});


// Action creators are generated for each case reducer function
export const { getEvaluacion, createEvaluacion, activeEvaluacion, updateEvaluacion, filterEvaluacionSlice } = evaluacionSlice.actions;