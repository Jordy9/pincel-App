import salonApi from "../../salonApi/salonApi";
import { createEvaluacion, getEvaluacion, updateEvaluacion } from "./evaluacionSlice";

export const obtenerEvaluacion = () => {
    return async(dispatch) => {

        try {
            const resp = await salonApi.get(`/evaluacion`)
    
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

        try {
            const resp = await salonApi.post(`/evaluacion/new`, {idCapacitacion, idUsuario, evaluacion, calificacion})
    
            dispatch(createEvaluacion(resp.data.evaluacion))

            socket?.emit('intento-change', {id: idCapacitacion, uid: idUsuario})

        } catch (error) {
            console.log(error)
        }
        
    }
}

export const actualizarEvaluacion = (evaluacion, calificacion, id) => {
    return async(dispatch, getState) => {

        const { socket } = getState().sk;

        const { uid:idUsuario } = getState().auth;

        const idCapacitacion = window.location.pathname.split('/')[2]

        socket?.emit('intento-change', {id: idCapacitacion, uid: idUsuario})

        try {
            const resp = await salonApi.put(`/evaluacion/update/${id}`, {idCapacitacion, idUsuario, evaluacion, calificacion})
    
            dispatch(updateEvaluacion(resp.data.evaluacion))

        } catch (error) {
            console.log(error)
        }
        
    }
}