import axios from "axios"
import { getComunicado } from "./comunicadoSlice";

const endPoint = process.env.REACT_APP_API_URL

const token = localStorage.getItem('token') || '';

export const obtenerComunicados = () => {
    return async(dispatch) => {

        try {
            const resp = await axios.get(`${endPoint}/comunicado`, {headers: {'x-token': token}})
    
            dispatch(getComunicado(resp.data.comunicado))

        } catch (error) {
        }
        
    }
}