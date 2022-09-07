import axios from "axios";
import Swal from "sweetalert2";
import { onUpdateTeam } from "../auth/authSlice";
import { obtenerUsuarios } from "../auth/thunk";
import { createTeam, deleteTeam, getTeam, updateTeam } from "./equipoSlice";

const endPoint = process.env.REACT_APP_API_URL

const token = localStorage.getItem('token') || '';

export const obtenerEquipo = () => {
    return async(dispatch) => {

        try {
            const resp = await axios.get(`${endPoint}/equipos`, {headers: {'x-token': token}})
    
            dispatch(getTeam(resp.data.equipo))

        } catch (error) {
        }
        
    }
}

export const crearEquipo = (name, items, setchangeColumns) => {
    return async(dispatch) => {

        try {
            const resp = await axios.post(`${endPoint}/equipos/new`, {name, items}, {headers: {'x-token': token}})

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

export const actualizarEquipo = (props) => {
    return async(dispatch) => {
        const {_id, name, items} = props

        try {
            const resp = await axios.put(`${endPoint}/equipos/update/${_id}`, {name, items}, {headers: {'x-token': token}})
    
            dispatch(updateTeam(resp.data.equipo))

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
            socket?.on('user-updated', (usuario) => {
                dispatch(onUpdateTeam(usuario))
            })
            return 
        }
        
        socket?.emit('update-team', { payload: equipos })
        socket?.on('user-updated-team', () => {
            dispatch(obtenerUsuarios())
            dispatch(obtenerEquipo())
        })
    }
}

export const actualizarColumnasInicio = (equipos) => {
    return async (dispatch, getState) => {
        const { socket } = getState().sk;

        if (equipos[1].name === 'Sin equipo') return

        socket?.emit('update-team-start', { payload: equipos })
        socket?.on('user-updated-team-start', () => {
            dispatch(obtenerUsuarios())
            dispatch(obtenerEquipo())
        })
    }
}

export const eliminarEquipo = (id) => {
    return async(dispatch) => {

        try {
            await axios.delete(`${endPoint}/equipo/delete/${id}`, {headers: {'x-token': token}})
    
            dispatch(deleteTeam(id))

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