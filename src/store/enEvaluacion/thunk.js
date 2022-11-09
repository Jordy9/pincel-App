import salonApi from "../../salonApi/salonApi"
import { createEnEvaluacion, deleteEnEvaluacion, getEnEvaluacion } from "./enEvaluacionSlice"

export const obtenerEnEvaluacion = () => {
    return async (dispatch) => {
        const resp = await salonApi.get(`/enEvaluacion`)

        dispatch(getEnEvaluacion(resp.data.enEvaluacion))
    }
}

export const tomandoEvaluacion = (idCapacitacion, idUsuario, capacitacionActiva) => {
    return async (dispatch, getState) => {

        const { socket } = getState().sk;

        socket?.emit('new-enevaluation', {idCapacitacion, idUsuario, capacitacionActiva})        
    }
}

export const eliminarEnEvaluacion = (id) => {
    return async (dispatch, getState) => {
        
        const { socket } = getState().sk;
        
        socket?.emit('delete-enevaluation', {id: id})

        dispatch(deleteEnEvaluacion(id))
        
    }
}