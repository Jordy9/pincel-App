import { createSlice } from '@reduxjs/toolkit';

export const capacitacionSlice = createSlice({
   name: 'capacitacion',
   initialState: {
      capacitacion: [],
      paraGuardar: [],
      capacitacionActiva: null,
      upload: 0
   },
   reducers: {
       getCapacitacion: (state, action ) => {
           state.capacitacion = action.payload;
        },

       createCapacitacion: (state, action ) => {
           state.capacitacion.push(action.payload)
        },

       toSave: (state, action ) => {
           state.paraGuardar.push(action.payload)
        },

       toSaveClear: (state ) => {
           state.paraGuardar = []
        },

       activeCapacitacion: (state, action ) => {
           state.capacitacionActiva = (action.payload)
        },

       uploadCapacitacion: (state, action ) => {
           state.upload = action.payload
        },

       uploadFinish: (state ) => {
           state.upload = 0
        },

       actualizarCapacitacion: (state, action ) => {
            state.capacitacion = state.capacitacion.map(
                e => e._id === action.payload._id ? action.payload : e
            );
        },
   }
});


// Action creators are generated for each case reducer function
export const { getCapacitacion, createCapacitacion, toSave, toSaveClear, activeCapacitacion, uploadCapacitacion, uploadFinish, actualizarCapacitacion } = capacitacionSlice.actions;