import axios from "axios";
import { createEvaluacion, getEvaluacion } from "./evaluacionSlice";


const endPoint = process.env.REACT_APP_API_URL

const token = localStorage.getItem('token') || '';

export const obtenerEvaluacion = () => {
    return async(dispatch) => {

        try {
            const resp = await axios.get(`${endPoint}/evaluacion`, {headers: {'x-token': token}})
    
            dispatch(getEvaluacion(resp.data.evaluacion))

        } catch (error) {
        }
        
    }
}

export const crearEvaluacion = (evaluacion, calificacion) => {
    return async(dispatch, getState) => {

        const { socket } = getState().sk;

        const { uid:idUsuario } = getState().auth;

        const idCapacitacion = window.location.pathname.split('/')[2]

        socket?.emit('intento-change', {id: idCapacitacion, uid: idUsuario})

        try {
            const resp = await axios.post(`${endPoint}/evaluacion/new`, {idCapacitacion, idUsuario, evaluacion, calificacion}, {headers: {'x-token': token}})
    
            dispatch(createEvaluacion(resp.data.evaluacion))

        } catch (error) {
        }
        
    }
}