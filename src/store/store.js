import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { chatSlice } from './chat/chatSlice'
import { comunicadoSlice } from './comunicado/comunicadoSlice'
import { evaluacionSlice } from './evaluacion/evaluacionSlice'
import { messageSlice } from './message/messageSlice'
import { notificacionesSlice } from './notificaciones/notificacionesSlice'
import { resenaSlice } from './resena/resenaSlice'
import { socketSlice } from './socket/socketSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    sk: socketSlice.reducer,
    cht: chatSlice.reducer,
    mg: messageSlice.reducer,
    nt: notificacionesSlice.reducer,
    rs: resenaSlice.reducer,
    ev: evaluacionSlice.reducer,
    co: comunicadoSlice.reducer
  },
})