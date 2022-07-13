import axios from 'axios'
import { deleteNotification, NotificacionCarga } from "./notificacionesSlice"

const endPoint = process.env.REACT_APP_API_URL

const token = localStorage.getItem('token') || '';

export const cargarNotificaciones = () => {
    return async(dispatch) => {

        const resp = await axios.get(`${endPoint}/notificacion`, {headers: {'x-token': token}})

        dispatch(NotificacionCarga(resp.data.notificacion))
    }
}

export const BorrarNotificaciones = () => {
    return async(dispatch, gestState) => {

        const {uid} = gestState().auth
        const {chatActivo} = gestState().cht

        const {notificaciones} = gestState().nt

        // const usuario = chatActivo

        if (notificaciones[notificaciones.length-1].from === chatActivo) {
            dispatch(deleteNotification({
                uid: uid,
                id: chatActivo
            }))
        }
        
        if (uid && chatActivo) {
            const resp = await axios.delete(`${endPoint}/notificacion`, { headers: {'x-token': token}, data: {uid, chatActivo} })

            console.log(resp)
        }

    }
}