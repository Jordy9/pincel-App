import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { chatSlice } from './chat/chatSlice'
import { messageSlice } from './message/messageSlice'
import { notificacionesSlice } from './notificaciones/notificacionesSlice'
import { socketSlice } from './socket/socketSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    sk: socketSlice.reducer,
    cht: chatSlice.reducer,
    mg: messageSlice.reducer,
    nt: notificacionesSlice.reducer
  },
})