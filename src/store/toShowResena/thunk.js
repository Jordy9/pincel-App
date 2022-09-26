import axios from 'axios'
import Swal from "sweetalert2"
import { getToShowResena, updateToShowResena } from './toShowResenaSlice';

const endPoint = process.env.REACT_APP_API_URL

const token = localStorage.getItem('token') || '';

export const obtenerToShowResena = () => {
    return async(dispatch) => {

        try {
            const resp = await axios.get(`${endPoint}/toShowResena`, {headers: {'x-token': token}})
    
            dispatch(getToShowResena(resp.data.toShowResena))

        } catch (error) {
            console.log(error)
        }
        
    }
}

export const actualizarResena = (props) => {
    return async(dispatch) => {
        const {_id, showResena} = props

        try {
            const resp = await axios.put(`${endPoint}/toShowResena/update/${_id}`, { showResena }, {headers: {'x-token': token}})
    
            dispatch(updateToShowResena(resp.data.toShowResena))

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
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