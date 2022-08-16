import axios from "axios"
import Swal from "sweetalert2"
import { onActiveUser, onChecking, onGetUsers, onLogin, onLogout, onRegister, onUpdate, uploadFinish, uploadImagePerfil } from "./authSlice"

const endPoint = process.env.REACT_APP_API_URL

const token = localStorage.getItem('token') || '';

export const obtenerUsuarios = () => {
    return async(dispatch) => {

        try {
            const resp = await axios.get(`${endPoint}/auth`, {headers: {'x-token': token}})
    
            dispatch(onGetUsers(resp.data.usuarios))

            await dispatch(obtenerUsuarioActivo())

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

export const iniciarActualizacion = (id, name, lastName, date, email, password, role, file) => {
    return async(dispatch, getState) => {

        const { usuarioActivo } = getState().auth;
        
        try {

            if (file) {

                const formData = new FormData()
                formData.append('file', file)
                formData.append('title', name + new Date())
        
                const respImage = await axios.post(`${endPoint}/fileUpload/perfil`, formData, {
                    headers: {'x-token': token},
                    onUploadProgress: (e) =>
                        {dispatch(uploadImagePerfil(Math.round( (e.loaded * 100) / e.total )))}
                })
        
                const idImage = respImage.data.image.id
                const urlImage = respImage.data.image.url
    
                const resp = await axios.put(`${endPoint}/auth/update/${id}`, {name, lastName, date, email, password, role, idImage, urlImage}, {headers: {'x-token': token}})
        
                if (resp.data.ok) {
    
                    dispatch(onUpdate(resp.data.usuario))

                    if (usuarioActivo?.idImage) {
                        await axios.delete(`${process.env.REACT_APP_API_URL}/fileUpload/${usuarioActivo?.idImage}`, {headers: {'x-token': token}})
                    }

    
                    dispatch(uploadFinish())
        
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

            } else {
                const idImage = usuarioActivo?.idImage
                const urlImage = usuarioActivo?.image

                const resp = await axios.put(`${endPoint}/auth/update/${id}`, {name, lastName, date, email, password, role, idImage, urlImage}, {headers: {'x-token': token}})
        
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

        if (uid) {
            const usuario = usuarios?.find(usuarios => usuarios?.id === uid)
            dispatch(onActiveUser(usuario))
        }
        
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
            console.log(error)
            localStorage.removeItem('token')
            localStorage.removeItem('token-init-date')
            dispatch(onChecking())
            dispatch(onLogout())
        }
    }
}