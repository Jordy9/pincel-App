import { createSlice } from '@reduxjs/toolkit';

export const customResenaSlice = createSlice({
   name: 'customResena',
   initialState: {
      resena: [],
      activeResena: '',
      customResenaFilterSlice: []
   },
   reducers: {
       getResena: (state, action ) => {
           state.resena = action.payload;
        },

       createResena: (state, action ) => {
           state.resena.push(action.payload)
        },
        
       setActiveResena: (state, action ) => {
           state.activeResena = action.payload;
        },

       setClearResena: (state ) => {
           state.activeResena = '';
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

            state.customResenaFilterSlice = state.customResenaFilterSlice.filter(
                e => (e._id !== action.payload)
            );
        },
        filterCustomResenaSlice: (state, action) => {
            state.customResenaFilterSlice = action.payload
        },
   }
});


// Action creators are generated for each case reducer function
export const { getResena, createResena, setActiveResena, setClearResena, UpdateResena, DeleteResena, filterCustomResenaSlice } = customResenaSlice.actions;