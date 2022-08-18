import axios from 'axios'
import Swal from "sweetalert2"
import { createAResena, createResena, deleteAResena, DeleteResena, getResena, setClearResena, UpdateResena } from './resenaSlice';

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

export const crearResena = (calificacion, descripcion) => {
    return async(dispatch) => {

        try {
            const resp = await axios.post(`${endPoint}/resena/new`, {calificacion, descripcion}, {headers: {'x-token': token}})
    
            dispatch(createResena(resp.data.resena))

            dispatch(setClearResena())

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

export const crearAResena = (usuario) => {
    return async(dispatch, getState) => {

        const { AResena } = getState().rs;
        const condicion = AResena?.filter(rs => rs?.id === usuario?.id)

        if (condicion?.length !== 0) {
            dispatch(deleteAResena(usuario))
        } else {
            dispatch(createAResena(usuario))
        }
        
    }
}

export const actualizarResena = (props) => {
    return async(dispatch) => {
        const {_id, calificacion, descripcion} = props

        const estado = !props.estado

        try {
            const resp = await axios.put(`${endPoint}/resena/update/${_id}`, {calificacion, descripcion, estado}, {headers: {'x-token': token}})
    
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

export const eliminarResena = (id) => {
    return async(dispatch) => {

        try {
            await axios.delete(`${endPoint}/resena/delete/${id}`, {headers: {'x-token': token}})
    
            dispatch(DeleteResena(id))

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
                title: 'Reseña eliminada correctamente'
            })

        } catch (error) {
            console.log(error)
        }
        
    }
}