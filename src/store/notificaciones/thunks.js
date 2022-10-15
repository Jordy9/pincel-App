import axios from 'axios'
import salonApi from '../../salonApi/salonApi'
import { deleteNotification, NotificacionCarga } from "./notificacionesSlice"

const endPoint = process.env.REACT_APP_API_URL

export const cargarNotificaciones = () => {
    return async(dispatch) => {

        const resp = await salonApi.get(`/notificacion`)

        dispatch(NotificacionCarga(resp.data.notificacion))
    }
}

export const BorrarNotificaciones = () => {
    return async(dispatch, gestState) => {

        const token = localStorage.getItem('token');

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