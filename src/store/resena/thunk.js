import axios from 'axios'
import Swal from "sweetalert2"
import { createResena, getResena, UpdateResena } from './resenaSlice';

const endPoint = process.env.REACT_APP_API_URL

const token = localStorage.getItem('token') || '';

export const obtenerResena = () => {
    return async(dispatch) => {

        try {
            const resp = await axios.get(`${endPoint}/resena`, {headers: {'x-token': token}})
    
            dispatch(getResena(resp.data.resena))

        } catch (error) {
        }
        
    }
}

export const crearResena = (id, calificacion, descripcion) => {
    return async(dispatch) => {

        try {
            const resp = await axios.post(`${endPoint}/resena/new`, {id, calificacion, descripcion}, {headers: {'x-token': token}})
    
            dispatch(createResena(resp.data.resena))

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
                title: 'Reseña creada correctamente'
            })

        } catch (error) {
            console.log(error)
        }
        
    }
}

export const actualizarResena = (id, calificacion, descripcion) => {
    return async(dispatch) => {

        try {
            const resp = await axios.put(`${endPoint}/resena/${id}`, {id, calificacion, descripcion}, {headers: {'x-token': token}})
    
            dispatch(UpdateResena(resp.data.resena))

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