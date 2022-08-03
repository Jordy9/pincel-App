import { createSlice } from '@reduxjs/toolkit';

export const resenaSlice = createSlice({
   name: 'resena',
   initialState: {
      resena: [],
      AResena: [],
      activeResena: ''
   },
   reducers: {
       getResena: (state, action ) => {
           state.resena = action.payload;
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
export const { getResena, createResena, createAResena, setActiveResena, setClearResena, deleteAResena, UpdateResena, DeleteResena } = resenaSlice.actions;