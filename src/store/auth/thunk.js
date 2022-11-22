import axios from "axios";
import Swal from "sweetalert2"
import salonApi from "../../salonApi/salonApi";
import { onActiveUser, onGetUsers, onLogin, onLogout, onRegister, onUpdate, onUpdateUser, uploadFinish, uploadImagePerfil } from "./authSlice"

export const obtenerUsuarios = () => {
    return async(dispatch) => {

        try {
            const resp = await salonApi.get(`/auth`)
    
            dispatch(onGetUsers(resp.data.usuarios))

            await dispatch(obtenerUsuarioActivo())

        } catch (error) {
        }
        
    }
}

export const iniciarRegistro = (name, lastName, email, date, role, file, password) => {
    return async(dispatch) => {

        try {
            if (file) {

                const formData = new FormData()
                formData.append('file', file)
                formData.append('title', name + new Date())
                formData.append('title2', name + new Date())

                const respImage = await salonApi.post(`/fileUpload/perfil`, formData, {

                    onUploadProgress: (e) =>
                        {dispatch(uploadImagePerfil(Math.round( (e.loaded * 100) / e.total )))}
                })

                const idImage = respImage.data.image.id
                const urlImage = respImage.data.image.url

                const resp = await salonApi.post(`/auth/new`, {name, lastName, email, date, role, urlImage, idImage, password})

                if (resp.data.ok) {

                    dispatch(uploadFinish())

                    dispatch(onRegister(resp.data.usuario))
        
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
                        title: 'Usuario registrado correctamente'
                    })
                }
            } else {

                const resp = await salonApi.post(`/auth/new`, {name, lastName, email, date, role, password})

                if (resp.data.ok) {
    
                    dispatch(onRegister(resp.data.usuario))
        
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
                        title: 'Usuario registrado correctamente'
                    })
                }
            }
    
        } catch ({response}) {
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
                icon: 'error',
                title: response.data.msg
            })
        }
        

    }
}

export const iniciarActualizacion = (id, name, lastName, email, date, team, role, file, password) => {
    return async(dispatch, getState) => {

        const { usuarioActivo } = getState().auth;
        
        try {

            if (file) {

                const formData = new FormData()
                formData.append('file', file)
                formData.append('title', name + new Date())
                formData.append('title2', name + new Date())
        
                const respImage = await salonApi.post(`/fileUpload/perfil`, formData, {

                    onUploadProgress: (e) =>
                        {dispatch(uploadImagePerfil(Math.round( (e.loaded * 100) / e.total )))}
                })
        
                const idImage = respImage.data.image.id
                const urlImage = respImage.data.image.url
    
                const resp = await salonApi.put(`/auth/update/${id}`, {name, lastName, date, email, password, role, team, idImage, urlImage})
        
                if (resp.data.ok) {
    
                    dispatch(onUpdate(resp.data.usuario))

                    if (usuarioActivo?.idImage) {
                        await salonApi.delete(`${process.env.REACT_APP_API_URL}/fileUpload/${usuarioActivo?.idImage}`)
                    }
    
                    dispatch(uploadFinish())
        
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
                        title: 'Usuario actualizado correctamente'
                    })
                }

            } else {
                const idImage = usuarioActivo?.idImage
                const urlImage = usuarioActivo?.image

                const resp = await salonApi.put(`/auth/update/${id}`, {name, lastName, date, email, password, role, team, idImage, urlImage})
        
                if (resp.data.ok) {
    
                    dispatch(onUpdate(resp.data.usuario))
        
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
                        title: 'Usuario actualizado correctamente'
                    })
                }
            }

        } catch ({response}) {
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
                icon: 'error',
                title: response.data.msg
            })
        }
        
    }
}

export const iniciarActualizacionModalUser = (id, name, lastName, email, date, team, role, file, password, estado) => {
    return async(dispatch, getState) => {

        const { activeUser } = getState().auth;
        
        try {

            if (file) {

                const formData = new FormData()
                formData.append('file', file)
                formData.append('title', name + new Date())
                formData.append('title2', name + new Date())
        
                const respImage = await salonApi.post(`/fileUpload/perfil`, formData, {

                    onUploadProgress: (e) =>
                        {dispatch(uploadImagePerfil(Math.round( (e.loaded * 100) / e.total )))}
                })
        
                const idImage = respImage.data.image.id
                const urlImage = respImage.data.image.url
    
                const resp = await salonApi.put(`/auth/update/${id}`, {name, lastName, date, email, password, role, team, idImage, urlImage})
        
                if (resp.data.ok) {
    
                    dispatch(onUpdateUser(resp.data.usuario))

                    if (activeUser?.idImage) {
                        await salonApi.delete(`${process.env.REACT_APP_API_URL}/fileUpload/${activeUser?.idImage}`)
                    }
    
                    dispatch(uploadFinish())
        
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
                        title: 'Usuario actualizado correctamente'
                    })
                }

            } else {
                const idImage = activeUser?.idImage
                const urlImage = activeUser?.image

                const resp = await salonApi.put(`/auth/update/${id}`, {name, lastName, date, email, password, role, team, idImage, urlImage})
        
                if (resp.data.ok) {
    
                    dispatch(onUpdateUser(resp.data.usuario))
        
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
                        title: 'Usuario actualizado correctamente'
                    })
                }
            }

        } catch ({response}) {
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
                icon: 'error',
                title: response.data.msg
            })
        }
        
    }
}

export const cambiarEstadoUsuario = (id, estado, team, activeResena) => {
    return async(dispatch, getState) => {

        const { socket } = getState().sk;

        const { equipos } = getState().eq;

        const { toResena } = getState().rs;

        // Filtro equipos

        const equipoFiltrado = equipos?.filter(equipo => equipo?.name === team)
        const indice = equipoFiltrado[0]?.items?.findIndex(item => item?.id === id)
        const nuevoEquipo = equipoFiltrado[0]?.items?.filter((e, index) => index !== indice)
        const idEquipo = equipoFiltrado[0]?._id

        // Filtro resena

        const toResenaFiltrada = toResena?.filter(resena => resena?.name === activeResena)

        const indiceToResena = toResenaFiltrada[0]?.items?.findIndex(item => item?.id === id)

        const nuevaToResena = toResenaFiltrada[0]?.items?.filter((e, index) => index !== indiceToResena)

        const idToResena = toResenaFiltrada[0]?._id

        // Creando un nuevo equipo y toResena

        const toResenaNueva = {...toResenaFiltrada[0], items: nuevaToResena}

        const equipoNuevo = {...equipoFiltrado[0], items: nuevoEquipo}

        try {

            const payload = {id, estado, idEquipo, equipoNuevo, idToResena, toResenaNueva}

            socket?.emit('cambiar-estado', payload)

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
                title: (estado) ? 'Usuario Activado correctamente' : 'Usuario Desactivado correctamente'
            })
            
        } catch (error) {
            console.log(error)
        }
    }
}

export const iniciarActualizacionPass = (id, name, lastName, date, email, password, role, team, urlImage) => {
    return async(dispatch) => {

        try {
            const resp = await salonApi.put(`/auth/updatePassword/${id}`, {name, lastName, date, email, password, role, team, urlImage})
    
            if (resp.data.ok) {

                dispatch(onUpdate(resp.data.usuario))
    
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
                    title: 'Usuario actualizado correctamente'
                })
            }
        } catch ({response}) {
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
                icon: 'error',
                title: response.data.msg
            })
        }
        

    }
}

export const iniciarLogin = (email, password) => {
    return async(dispatch) => {

        try {
            const resp = await salonApi.post(`/auth`, {email, password})
    
            if (resp.data.ok) {

                dispatch(onLogin({
                    uid: resp.data.uid,
                    name: resp.data.name
                }))
    
                localStorage.setItem('token', resp.data.token)
                localStorage.setItem('token-init-date', new Date().getTime());
                localStorage.setItem('date-click', new Date().getTime())

                dispatch(obtenerUsuarioActivo())
            }
        } catch ({response}) {
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
        localStorage.removeItem('date-click')

        dispatch(onLogout())
    }
}

export const iniciarAutenticacion = () => {
    return async(dispatch) => {

        const token = localStorage.getItem('token')

        if (!token) return dispatch(iniciarLogout())

        try {
            const resp = await salonApi.get(`/auth/renew`);
            
            localStorage.setItem('token', resp.data.token)
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({
                uid: resp.data.uid,
                name: resp.data.name
            }))
        } catch ({response}) {
            dispatch(iniciarLogout())
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
                icon: 'error',
                title: response.data.msg
            })
        }
    }
}

export const iniciarLogoutTokenExpire = () => {
    return (dispatch) => {
        localStorage.removeItem('token')
        localStorage.removeItem('token-init-date')
        localStorage.removeItem('date-click')
        dispatch(onLogout())

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
            icon: 'error',
            title: 'Su token expiro'
        })
    }
}

export const recuperarCont = (email) => {
    return async (dispatch) => {
        await salonApi.post('auth/sendUserEmail', {email})
    }
}

export const recuperarPass = (id, name, lastName, date, email, password, role, team, urlImage, tokenUser) => {
    return async(dispatch) => {

        try {

            const resp = await axios.put(`${process.env.REACT_APP_API_URL}/auth/resetPassword/${id}`, {name, lastName, date, email, password, role, team, urlImage, tokenUser}, {headers: {'token-user': tokenUser}})

    
            if (resp.data.ok) {

                dispatch(onUpdate(resp.data.usuario))
    
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
                    title: 'Usuario actualizado correctamente'
                })
            }
        } catch ({response}) {
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
                icon: 'error',
                title: response.data.msg
            })
        }
        

    }
}