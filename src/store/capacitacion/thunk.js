import axios from "axios"
import Swal from "sweetalert2";
import { activeCapacitacion, actualizarCapacitacion, createCapacitacion, deleteCapacitacion, getCapacitacion, toSave, toUpdateClear, uploadCapacitacion, uploadFinish } from "./capacitacionSlice";

const endPoint = process.env.REACT_APP_API_URL

const token = localStorage.getItem('token') || '';

export const obtenerCapacitacion = () => {
    return async(dispatch) => {

        try {
            const resp = await axios.get(`${endPoint}/capacitacion`, {headers: {'x-token': token}})
    
            dispatch(getCapacitacion(resp.data.capacitacion))

            const capacitacionId = window.location.pathname.split('/')[2]

            const queryString = window.location.search.split('?q=')[1]

            const capacitacionFiltrada = resp.data.capacitacion?.filter(capacitacion => capacitacion?._id === capacitacionId)

            let filtro

            if (capacitacionFiltrada?.length !== 0) {
                capacitacionFiltrada?.map(capacitacion =>
                    filtro = capacitacion?.video?.filter(video => video?.idVideo === queryString),
                    )
                    dispatch(activeCapacitacion({_id: capacitacionFiltrada[0]?._id, videos: filtro[0] || capacitacionFiltrada[0]?.video[0], preguntas: capacitacionFiltrada[0]?.Preguntas, descripcion: capacitacionFiltrada[0]?.descripcion, usuariosEvaluacion: capacitacionFiltrada[0]?.usuariosEvaluacion, intentos: capacitacionFiltrada[0]?.intentos}))
                }

        } catch (error) {
        }
        
    }
}

// export const crearVideos = (video) => {
//     return async(dispatch) => {
        
        
//         try {
//             const formData = new FormData()
//             for (let index = 0; index < video.length; index++) {
//                 const element = video[index];

//                 formData.append('file', element.video)
//                 formData.append('title', element.titulo)
//                 formData.append('title2', element.titulo + new Date())
//             }

//             const resp = await Promise.all([
//                 axios.post(`${endPoint}/fileUpload`, formData, {
//                     headers: {'x-token': token}, 
//                     onUploadProgress: (e) =>
//                     {dispatch(uploadCapacitacion(Math.round( (e.loaded * 100) / e.total )))}
//                 })
//             ])

//             for (let index = 0; index < resp[0].data.image.length; index++) {
//                 const element = resp[0].data.image[index];

//                 dispatch(toSave(element))
//             }

//             dispatch(uploadFinish())
    
//         } catch (error) {
//             dispatch(uploadFinish())
//             const Toast = Swal.mixin({
//                 toast: true,
//                 position: 'top-end',
//                 showConfirmButton: false,
//                 timer: 5000,
//                 timerProgressBar: true,
//                 didOpen: (toast) => {
//                 toast.addEventListener('mouseenter', Swal.stopTimer)
//                 toast.addEventListener('mouseleave', Swal.resumeTimer)
//                 }
//             })
            
//             return Toast.fire({
//                 icon: 'error',
//                 title: 'Hubo un problema al subir este video, verifique que el video funcione correctamente'
//             })
//         }
        
//     }
// }


// export const actualizarVideos = (video, indice) => {
//     return async(dispatch, getState) => {

//         const { capacitacion, paraEditar } = getState().cp;

//         let ok = false
        
//         try {

//             const formData = new FormData()

//             for (let index = 0; index < video.length; index++) {
//                 const element = video[index];
                
//                 if (typeof element?.video !== 'string') {
//                     formData.append('file', element.video)
//                     formData.append('title', element.titulo)
//                     formData.append('title2', element.titulo + new Date())

//                     ok = true

//                 } else if (paraEditar?.video[index].titulo === element.titulo) {
//                     dispatch(toSave(paraEditar?.video[index]))
//                 } else {
//                     dispatch(toSave({...paraEditar?.video[index], titulo: element.titulo}))
//                 }
                    
//             }

//             let resp

//             if (ok) {
//                 resp = await Promise.all([
//                     axios.post(`${endPoint}/fileUpload`, formData, {
//                         headers: {'x-token': token}, 
//                         onUploadProgress: (e) =>
//                         {dispatch(uploadCapacitacion(Math.round( (e.loaded * 100) / e.total )))}
//                     })
//                 ])
                
//                 for (let index = 0; index < resp[0].data.image.length; index++) {
//                     const element = resp[0].data.image[index];
//                     let nuevo
                    
//                     if (paraEditar?.video[indice[index]]) {
//                         capacitacion?.map(capacitacion => (
//                             capacitacion?.video[indice[index]]?.idVideo === paraEditar?.video[indice[index]]?.idVideo ? nuevo = element : capacitacion
//                         ))
    
//                         nuevo.createdAt = paraEditar?.video[indice[index]].createdAt
            
//                         dispatch(toSave(nuevo))
//                     } else {
//                         dispatch(toSave(element))
//                     }
//                 }
    
//                 dispatch(uploadFinish())
//             }
            
    
//         } catch (error) {
//             dispatch(uploadFinish())
//             const Toast = Swal.mixin({
//                 toast: true,
//                 position: 'top-end',
//                 showConfirmButton: false,
//                 timer: 5000,
//                 timerProgressBar: true,
//                 didOpen: (toast) => {
//                 toast.addEventListener('mouseenter', Swal.stopTimer)
//                 toast.addEventListener('mouseleave', Swal.resumeTimer)
//                 }
//             })
            
//             return Toast.fire({
//                 icon: 'error',
//                 title: 'Hubo un problema al subir este video, verifique que el video funcione correctamente'
//             })
//         }
//     }
// }

// export const eliminarVideoActualizado = (indiceEliminar) => {
//     return async(dispatch, getState) => {

//         const { paraEditar } = getState().cp;

//         for (let index = 0; index < indiceEliminar.length; index++) {
//             const element = indiceEliminar[index];
//             await axios.delete(`${endPoint}/fileUpload/${paraEditar?.video[element]?.idVideo}`, {headers: {'x-token': token}})
//         }

//     }
// }

export const crearCapacitacion = (title, file, descripcion, intentos, video, Preguntas, duracion, team) => {
    return async(dispatch, getState) => {

        const { usuarios } = getState().auth;

        let usuariosEvaluacion = []

        usuarios?.map(usuario => usuariosEvaluacion?.push({id: usuario?.id, intentos}))

        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', title)
        formData.append('title2', title + new Date())

        try {

            const respImage = await axios.post(`${endPoint}/fileUpload/imagen`, formData, {
                headers: {'x-token': token},
                onUploadProgress: (e) =>
                {dispatch(uploadCapacitacion(Math.round( (e.loaded * 100) / e.total )))}
            })

            const idImage = respImage.data.image.id
            const image = respImage.data.image.url

            const resp = await axios.post(`${endPoint}/capacitacion/new`, {title, image, idImage, descripcion, intentos, video, Preguntas, duracion, team, usuariosEvaluacion}, {headers: {'x-token': token}})
    
            dispatch(uploadFinish())
            dispatch(createCapacitacion(resp.data.capacitacion))

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
                title: 'Capacitación creada correctamente'
            })

        } catch ({response}) {
            console.log(response.data.msg)
        }
        
    }
}

export const actualizarCapacitacionForm = (title, file, descripcion, intentos, video, Preguntas, duracion, team) => {
    return async(dispatch, getState) => {

        const { paraEditar } = getState().cp;

        let usuariosEvaluacion = []

        if (paraEditar?.intentos !== intentos) {
            
            paraEditar?.usuariosEvaluacion?.map(e => (
                usuariosEvaluacion.push({id: e?.id, intentos})
            ))

        } else {
            usuariosEvaluacion = paraEditar?.usuariosEvaluacion
        }
        
        try {
            if (typeof file !== 'string') {

                const formData = new FormData()
                formData.append('file', file)
                formData.append('title', title)
                formData.append('title2', title + new Date())
    
                const respImage = await axios.post(`${endPoint}/fileUpload/imagen`, formData, {
                    headers: {'x-token': token},
                    onUploadProgress: (e) =>
                    {dispatch(uploadCapacitacion(Math.round( (e.loaded * 100) / e.total )))}
                })
    
                const idImage = respImage.data.image.id
                const image = respImage.data.image.url
    
                const resp = await axios.put(`${endPoint}/capacitacion/update/${paraEditar?._id}`, {title, image, idImage, descripcion, intentos, video, Preguntas, duracion, team, usuariosEvaluacion}, {headers: {'x-token': token}})
        
                dispatch(uploadFinish())

                await axios.delete(`${endPoint}/fileUpload/${paraEditar?.idImage}`, {headers: {'x-token': token}})
                
                dispatch(actualizarCapacitacion(resp.data.capacitacion))

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
                    title: 'Capacitación actualizada correctamente'
                })
            } else {
                const image = file
                const idImage = paraEditar?.idImage
                const resp = await axios.put(`${endPoint}/capacitacion/update/${paraEditar?._id}`, {title, image, idImage, descripcion, intentos, video, Preguntas, duracion, team, usuariosEvaluacion}, {headers: {'x-token': token}})
        
                dispatch(uploadFinish())
                dispatch(actualizarCapacitacion(resp.data.capacitacion))
                // dispatch(toUpdateClear())

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
                    title: 'Capacitación actualizada correctamente'
                })
            }

        } catch (error) {
            console.log(error)
        }
        
    }
}

export const publicarCapacitacion = (capacitacion, publicar) => {
    return async(dispatch) => {

        const resp = await axios.put(`${endPoint}/capacitacion/update/${capacitacion?._id}`, {...capacitacion, publicar}, {headers: {'x-token': token}})
        dispatch(actualizarCapacitacion(resp.data.capacitacion))

        if (publicar) {

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
                title: 'Capacitación publicada correctamente'
            })

        } else {

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
                title: 'Capacitación Oculta'
            })
        }
    }
}

export const eliminarCapacitacion = (props) => {
    return async(dispatch, getState) => {

        const { evaluacion } = getState().ev;

        const evaluacionFiltrada = evaluacion?.filter(evaluacion => evaluacion?.idCapacitacion === props?._id)
        
        try {
            const resp = await axios.delete(`${endPoint}/capacitacion/delete/${props?._id}`, {headers: {'x-token': token}})

            if (evaluacionFiltrada?.length !== 0) {
                await axios.post(`${endPoint}/evaluacion/delete`, evaluacionFiltrada, {headers: {'x-token': token}})
            }

            dispatch(deleteCapacitacion(resp.data.capacitacion))

            await axios.delete(`${endPoint}/fileUpload/${props?.idImage}`, {headers: {'x-token': token}})

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
                title: 'Capacitación eliminada correctamente'
            })
        } catch (error) {
            console.log(error)
        }
    }
}

// const eliminarCapacitacionVideos = (videos) => {
//     return async(dispatch) => {

//         for (let index = 0; index < videos.length; index++) {
//             const element = videos[index];
            
//             try {
    
//                 await axios.delete(`${endPoint}/fileUpload/${element?.idVideo}`, {headers: {'x-token': token}})
//             } catch (error) {
//                 console.log(error)
//             }
//         }
        
//     }
// }

export const checkVideoUser = (id, idVideo, uid) => {
    return (dispatch, getState) => {
        const { socket } = getState().sk;

        socket?.emit('check-video-capacitacion', {id, idVideo, uid})
    }
}

export const saveVideoId = (id, uid) => {
    return (dispatch, getState) => {
        const { socket } = getState().sk;

        socket?.emit('last-video-save', {id, uid})
    }
}

export const updateUsuarioIntento = (id, uid) => {
    return (dispatch, getState) => {
        const { socket } = getState().sk;

        socket?.emit('update-one-user-evaluacion', {id, uid})

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
            title: 'Este usuario tiene un intento adicional'
        })
    }
}