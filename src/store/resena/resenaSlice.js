import { createSlice } from '@reduxjs/toolkit';

export const resenaSlice = createSlice({
   name: 'resena',
   initialState: {
      resena: [],
      AResena: [],
      activeResena: '',
      comenzar: true,
      toResena: []
   },
   reducers: {
       getResena: (state, action ) => {
           state.resena = action.payload;
        },

       getToResena: (state, action ) => {
           state.toResena = action.payload;
        },

       createResena: (state, action ) => {
           state.resena.push(action.payload)
        },
        
       createAResena: (state, action ) => {
           state.AResena.push(action.payload)
        },

       setActiveResena: (state, action ) => {
           state.activeResena = action.payload;
        },

       setClearResena: (state ) => {
           state.AResena = [];
        },

       deleteAResena: (state, action ) => {
            state.AResena = state.AResena.filter(
                e => (e.id !== action.payload.id)
            );
        },

        comenzarResena: (state, action ) => {
            state.comenzar = action.payload
        },

        UpdateResena: (state, action ) => {
            state.resena = state.resena.map(
                e => e._id === action.payload._id ? action.payload : e
            );
        },

       DeleteResena: (state, action ) => {
            state.resena = state.resena.filter(
                e => (e._id !== action.payload)
            );
        },
   }
});


// Action creators are generated for each case reducer function
export const { getResena, getToResena, createResena, createAResena, setActiveResena, setClearResena, deleteAResena, UpdateResena, comenzarResena, DeleteResena } = resenaSlice.actions;