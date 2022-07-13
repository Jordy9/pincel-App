import { createSlice } from '@reduxjs/toolkit';

export const notificacionesSlice = createSlice({
   name: 'notificaciones',
   initialState: {
    notificaciones: [],
    newNotfification: null
   },
   reducers: {
        NotificacionCarga: (state, action ) => {
            state.notificaciones = [...action.payload];
        },

        NotificacionesCargadas: (state, action ) => {
            state.notificaciones = [...action.payload];
            state.newNotfification = action.payload[action.payload.length -1];
        },

        RemoveNewNotificacion: (state ) => {
            state.newNotfification = null;
        },

        deleteNotification: (state, action ) => {
            state.notificaciones = state.notificaciones.filter(
                e => e.from !== action.payload.id && e.to !== action.payload.uid
            )
        },
   }
});


// Action creators are generated for each case reducer function
export const { NotificacionCarga, NotificacionesCargadas, RemoveNewNotificacion, deleteNotification } = notificacionesSlice.actions;