import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { capacitacionSlice } from './capacitacion/capacitacionSlice'
import { chatSlice } from './chat/chatSlice'
import { comunicadoSlice } from './comunicado/comunicadoSlice'
import { customResenaSlice } from './customResena/customResenaSlice'
import { equipoSlice } from './equipo/equipoSlice'
import { evaluacionSlice } from './evaluacion/evaluacionSlice'
import { messageSlice } from './message/messageSlice'
import { notificacionesSlice } from './notificaciones/notificacionesSlice'
import { resenaSlice } from './resena/resenaSlice'
import { socketSlice } from './socket/socketSlice'
import { toShowResenaSlice } from './toShowResena/toShowResenaSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    sk: socketSlice.reducer,
    cht: chatSlice.reducer,
    mg: messageSlice.reducer,
    nt: notificacionesSlice.reducer,
    rs: resenaSlice.reducer,
    cp: capacitacionSlice.reducer,
    co: comunicadoSlice.reducer,
    ev: evaluacionSlice.reducer,
    eq: equipoSlice.reducer,
    to: toShowResenaSlice.reducer,
    cr: customResenaSlice.reducer
  },
})