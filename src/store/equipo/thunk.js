import axios from "axios";
import Swal from "sweetalert2";
import salonApi from "../../salonApi/salonApi";
import { onUpdateTeam } from "../auth/authSlice";
import { obtenerUsuarios } from "../auth/thunk";
import { obtenerToResena } from "../resena/thunk";
import { createTeam, deleteTeam, getTeam, updateTeam } from "./equipoSlice";

const endPoint = process.env.REACT_APP_API_URL

export const obtenerEquipo = () => {
    return async(dispatch) => {

        try {
            const resp = await salonApi.get(`/equipos`)
    
            dispatch(getTeam(resp.data.equipo))

        } catch (error) {
        }
        
    }
}

export const crearEquipo = (name, items, setchangeColumns) => {
    return async(dispatch) => {

        try {
            const resp = await salonApi.post(`/equipos/new`, {name, items})

            setchangeColumns(true)
    
            dispatch(createTeam(resp.data.equipo))

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
                title: 'Equipo creado correctamente'
            })

        } catch (error) {
            console.log(error)
        }
        
    }
}

export const actualizarEquipo = (props, name2) => {
    return async(dispatch) => {
        const {_id} = props

        try {
            await salonApi.put(`/equipos/update/${_id}`, {...props, name2})
    
            dispatch(obtenerUsuarios())
            dispatch(obtenerEquipo())

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
                title: 'Equipo actualizado correctamente'
            })

        } catch (error) {
            console.log(error)
        }
        
    }
}

export const actualizarColumnas = (equipos) => {
    return async (dispatch, getState) => {
        const { socket } = getState().sk;

        if (equipos[2].name === 'Sin equipo') {
            const usuarioId = equipos[2].items[equipos[1]].id
            socket?.emit('update-user-team', { payload: usuarioId })
            return 
        }
        
        socket?.emit('update-team', { payload: equipos })
    }
}

export const actualizarColumnasOrdenar = (equipos) => {
    return async (dispatch, getState) => {
        const { socket } = getState().sk;

        if (equipos[2].name === 'Desactivados para reseñas') {
            const usuarioId = equipos[2].items[equipos[1]].id
            socket?.emit('update-user-team-order', { payload: usuarioId })
            return 
        }

        equipos[2].items[equipos[1]] = {...equipos[2].items[equipos[1]], toResena: equipos[2].name}
        
        socket?.emit('update-team-order', { payload: equipos })
    }
}

export const actualizarColumnasInicio = (equipos) => {
    return async (dispatch, getState) => {
        const { socket } = getState().sk;

        if (equipos[1].name === 'Sin equipo') return

        socket?.emit('update-team-start', { payload: equipos })
    }
}

export const actualizarColumnasInicioOrder = (equipos) => {
    return async (dispatch, getState) => {
        const { socket } = getState().sk;

        if (equipos[1].name === 'Desactivados para reseñas') return

        socket?.emit('update-team-start-order', { payload: equipos })
    }
}

export const eliminarEquipo = (props) => {
    return async(dispatch) => {

        const token = localStorage.getItem('token')

        try {
            await axios.delete(`${endPoint}/equipos/delete/${props._id}`, {headers: {'x-token': token}, data: {props}})
    
            dispatch(deleteTeam(props._id))
            dispatch(obtenerUsuarios())
            dispatch(obtenerEquipo())

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
                title: 'Equipo eliminado correctamente'
            })

        } catch (error) {
            console.log(error)
        }
        
    }
}