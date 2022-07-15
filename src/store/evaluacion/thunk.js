import axios from "axios"
import { getevaluacion } from "./evaluacionSlice";

const endPoint = process.env.REACT_APP_API_URL

const token = localStorage.getItem('token') || '';

export const obtenerEvaluacion = () => {
    return async(dispatch) => {

        try {
            const resp = await axios.get(`${endPoint}/evaluacion`, {headers: {'x-token': token}})
    
            dispatch(getevaluacion(resp.data.evaluacion))

        } catch (error) {
        }
        
    }
}