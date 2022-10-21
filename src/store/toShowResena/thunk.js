import Swal from "sweetalert2"
import salonApi from '../../salonApi/salonApi';
import { getToShowResena, updateToShowResena } from './toShowResenaSlice';

export const obtenerToShowResena = () => {
    return async(dispatch) => {

        try {
            const resp = await salonApi.get(`/toShowResena`)
    
            dispatch(getToShowResena(resp.data.toShowResena))

        } catch (error) {
            console.log(error)
        }
        
    }
}

export const actualizarResena = ({ _id, showResena, title, pregunta, inputType }) => {
    return async(dispatch) => {

        try {
            const resp = await salonApi.put(`/toShowResena/update/${_id}`, { showResena, title, pregunta, inputType })
    
            dispatch(updateToShowResena(resp.data.toShowResena))

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            
            return Toast.fire({
                icon: 'success',
                title: 'Reseña actualizada correctamente'
            })

        } catch (error) {
            console.log(error)
        }
        
    }
}