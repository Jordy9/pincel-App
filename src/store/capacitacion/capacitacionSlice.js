import { createSlice } from '@reduxjs/toolkit';

export const capacitacionSlice = createSlice({
   name: 'capacitacion',
   initialState: {
      capacitacion: [],
      paraGuardar: [],
      capacitacionActiva: null,
      paraEditar: null,
      upload: 0,
      noMostrarBoton: true
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

    //    toUpdateSave: (state, action ) => {
    //        state.paraGuardar.push(action.payload.)
    //     },

       toUpdate: (state, action ) => {
           state.paraEditar = action.payload
        },

       toUpdateClear: (state ) => {
           state.paraEditar = null
        },

       toSaveClear: (state ) => {
           state.paraGuardar = []
        },

       activeCapacitacion: (state, action ) => {
           state.capacitacionActiva = (action.payload)
        },

       noMostrar: (state ) => {
           state.noMostrarBoton = true
        },

       Mostrar: (state ) => {
           state.noMostrarBoton = false
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

       deleteCapacitacion: (state, action ) => {
            state.capacitacion = state.capacitacion.filter(
                e => e._id !== action.payload._id
            );
        },
   }
});


// Action creators are generated for each case reducer function
export const { getCapacitacion, createCapacitacion, toSave, toUpdate, toSaveClear, toUpdateClear, activeCapacitacion, noMostrar, Mostrar, uploadCapacitacion, uploadFinish, actualizarCapacitacion, deleteCapacitacion } = capacitacionSlice.actions;