import salonApi from "../../salonApi/salonApi"
import { activeCapacitacion } from "../capacitacion/capacitacionSlice"
import { createEnEvaluacion, deleteEnEvaluacion, getEnEvaluacion } from "./enEvaluacionSlice"

export const obtenerEnEvaluacion = () => {
    return async (dispatch, getState) => {
        const resp = await salonApi.get(`/enEvaluacion`)

        dispatch(getEnEvaluacion(resp.data.enEvaluacion))

        const { uid } = getState().auth;

        const enEv = resp.data.enEvaluacion?.find(ev => ev?.idUsuario === uid)

        if (enEv?.capacitacionActiva) {
            dispatch(activeCapacitacion({...enEv?.capacitacionActiva}))
        }
    }
}

export const tomandoEvaluacion = (idCapacitacion, idUsuario, capacitacionActiva) => {
    return async (dispatch) => {
        
        const resp = await salonApi.post(`/enEvaluacion/new`, {idCapacitacion, idUsuario, capacitacionActiva})

        dispatch(createEnEvaluacion(resp.data.enEvaluacion))
        
    }
}

export const eliminarEnEvaluacion = (id) => {
    return async (dispatch) => {
        
        await salonApi.delete(`/enEvaluacion/delete/${id}`)

        dispatch(deleteEnEvaluacion(id))
        
    }
}