import { createSlice } from '@reduxjs/toolkit';

export const equipoSlice = createSlice({
   name: 'equipo',
   initialState: {
      equipos: []
   },
   reducers: {
       getTeam: (state, action ) => {
           state.equipos = action.payload;
        },

       createTeam: (state, action ) => {
           state.equipos.push(action.payload);
        },

       updateTeam: (state, action ) => {
           state.equipos = state.equipos.map(
            e => e._id === action.payload._id ? action.payload : e
           );
        },

       deleteTeam: (state, action ) => {
           state.equipos = state.equipos.filter(
            e => e._id !== action.payload._id
           );
        },
   }
});


// Action creators are generated for each case reducer function
export const { getTeam, createTeam, updateTeam, deleteTeam } = equipoSlice.actions;