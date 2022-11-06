import { createSlice } from '@reduxjs/toolkit';

export const enEvaluacionSlice = createSlice({
   name: 'enEvaluacion',
   initialState: {
        enEvaluacion: []
   },
   reducers: {
        getEnEvaluacion: (state, action ) => {
            state.enEvaluacion = action.payload
        },

        createEnEvaluacion: (state, action ) => {
            state.enEvaluacion.push(action.payload)
        },

        updateEnEvaluacion: (state, action ) => {
            state.enEvaluacion = state.enEvaluacion.map(e => 
            ( e._id === action.payload?._id ? action.payload : e
            ))
        },

        deleteEnEvaluacion: (state, action ) => {
            state.enEvaluacion = state.enEvaluacion.filter(
                e => e._id !== action.payload
            );
        },
   }
});


// Action creators are generated for each case reducer function
export const { getEnEvaluacion, createEnEvaluacion, updateEnEvaluacion, deleteEnEvaluacion } = enEvaluacionSlice.actions;