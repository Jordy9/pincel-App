import salonApi from "../../salonApi/salonApi";
import { getComunicado } from "./comunicadoSlice";

export const obtenerComunicados = () => {
    return async(dispatch) => {

        try {
            const resp = await salonApi.get(`/comunicado`)
    
            dispatch(getComunicado(resp.data.comunicado))

        } catch (error) {
        }
        
    }
}