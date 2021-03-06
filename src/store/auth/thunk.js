import axios from "axios"
import Swal from "sweetalert2"
import { onActiveUser, onChecking, onGetUsers, onLogin, onLogout, onRegister, onUpdate } from "./authSlice"

const endPoint = process.env.REACT_APP_API_URL

const token = localStorage.getItem('token') || '';

export const obtenerUsuarios = () => {
    return async(dispatch) => {

        try {
            const resp = await axios.get(`${endPoint}/auth`, {headers: {'x-token': token}})
    
            dispatch(onGetUsers(resp.data.usuarios))

            dispatch(obtenerUsuarioActivo())

        } catch (error) {
        }
        
    }
}

export const iniciarRegistro = (name, lastName, email, password) => {
    return async(dispatch) => {

        try {
            const resp = await axios.post(`${endPoint}/auth/new`, {name, lastName, email, password}, {headers: {'x-token': token}})
    
            if (resp.data.ok) {

                dispatch(onRegister({
                    uid: resp.data.uid,
                    name: resp.data.name
                }))
    
                localStorage.setItem('token', resp.data.token)
                localStorage.setItem('token-init-date', new Date().getTime());

                dispatch(obtenerUsuarioActivo())
    
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
                    title: 'Usuario registrado correctamente'
                })
            }
        } catch ({response}) {
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
                icon: 'error',
                title: response.data.msg
            })
        }
        

    }
}

export const iniciarActualizacion = (id, name, lastName, date, email, password, role) => {
    return async(dispatch) => {

        try {
            const resp = await axios.put(`${endPoint}/auth/update/${id}`, {name, lastName, date, email, password, role}, {headers: {'x-token': token}})
    
            if (resp.data.ok) {

                dispatch(onUpdate(resp.data.usuario))
    
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
                    title: 'Usuario actualizado correctamente'
                })
            }
        } catch ({response}) {
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
                icon: 'error',
                title: response.data.msg
            })
        }
        

    }
}

export const iniciarActualizacionPass = (id, name, lastName, date, email, passwordActual, password, role) => {
    return async(dispatch) => {

        try {
            const resp = await axios.put(`${endPoint}/auth/updatePassword/${id}`, {name, lastName, date, email, passwordActual, password, role}, {headers: {'x-token': token}})
    
            if (resp.data.ok) {

                dispatch(onUpdate(resp.data.usuario))
    
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
                    title: 'Usuario actualizado correctamente'
                })
            }
        } catch ({response}) {
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
                icon: 'error',
                title: response.data.msg
            })
        }
        

    }
}

export const iniciarLogin = (email, password) => {
    return async(dispatch) => {

        try {
            const resp = await axios.post(`${endPoint}/auth`, {email, password}, {headers: {'x-token': token}})
    
            if (resp.data.ok) {

                dispatch(onLogin({
                    uid: resp.data.uid,
                    name: resp.data.name
                }))
    
                localStorage.setItem('token', resp.data.token)
                localStorage.setItem('token-init-date', new Date().getTime());

                dispatch(obtenerUsuarioActivo())
            }
        } catch ({response}) {
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
                icon: 'error',
                title: response.data.msg
            })
        }
        

    }
}

export const obtenerUsuarioActivo = () => {
    return async(dispatch, getState) => {

        const { usuarios, uid } = getState().auth

        const usuario = usuarios?.find(usuarios => usuarios.id === uid)

        dispatch(onActiveUser(usuario))
        
    }
}

export const iniciarLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('token')
        localStorage.removeItem('token-init-date')

        dispatch(onLogout())
    }
}

export const iniciarAutenticacion = () => {
    return async(dispatch) => {

        try {
            const resp = await axios.get(`${endPoint}/auth/renew`, {headers: {'x-token': token}});
            
            localStorage.setItem('token', resp.data.token)
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({
                uid: resp.data.uid,
                name: resp.data.name
            }))
        } catch (error) {
            localStorage.removeItem('token')
            localStorage.removeItem('token-init-date')
            dispatch(onChecking())
            dispatch(onLogout())
        }
    }
}