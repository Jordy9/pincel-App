import axios from 'axios'
import moment from 'moment';
import Swal from "sweetalert2"
import { createResena, DeleteResena, filterCustomResenaSlice, getResena, UpdateResena } from './customResenaSlice';

const endPoint = process.env.REACT_APP_API_URL

const token = localStorage.getItem('token') || '';

export const obtenerCustomResena = () => {
    return async(dispatch) => {

        try {
            const resp = await axios.get(`${endPoint}/customResena`, {headers: {'x-token': token}})
    
            dispatch(getResena(resp.data.resena))

            const resena = resp.data.resena?.filter(resena => moment(resena?.createdAt).format('M/Y') === moment().format('M/Y'))
            
            dispatch(filterCustomResenaSlice(resena))

        } catch (error) {
        }
        
    }
}

export const crearCustomResena = (titulo, calificacion, descripcion, setComenzar, setDisableButtom) => {
    return async(dispatch) => {

        try {

            const resp = await axios.post(`${endPoint}/customResena/new`, {titulo, calificacion, descripcion}, {headers: {'x-token': token}})
    
            dispatch(createResena(resp.data.resena))

            setComenzar(true)

            setDisableButtom(false)

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

export const actualizarCustomResena = (props) => {
    return async(dispatch) => {
        const {_id, calificacion, descripcion} = props

        const estado = !props.estado

        try {
            const resp = await axios.put(`${endPoint}/customResena/update/${_id}`, {calificacion, descripcion, estado}, {headers: {'x-token': token}})
    
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

export const eliminarCustomResena = (id) => {
    return async(dispatch) => {

        try {
            await axios.delete(`${endPoint}/customResena/delete/${id}`, {headers: {'x-token': token}})
    
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