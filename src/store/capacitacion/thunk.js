import axios from "axios";
import Swal from "sweetalert2";
import salonApi from "../../salonApi/salonApi";
import { activeCapacitacion, actualizarCapacitacion, createCapacitacion, deleteCapacitacion, getCapacitacion, toSave, toUpdate, toUpdateClear, uploadCapacitacion, uploadFinish } from "./capacitacionSlice";

export const obtenerCapacitacion = () => {
    return async(dispatch) => {

        try {
            const resp = await salonApi.get(`/capacitacion`)
    
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
//                 salonApi.post(`/fileUpload`, formData, {
//                      
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
//                     salonApi.post(`/fileUpload`, formData, {
//                          
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
//             await salonApi.delete(`/fileUpload/${paraEditar?.video[element]?.idVideo}`)
//         }

//     }
// }

export const crearCapacitacion = (title, descripcion, intentos, video, Preguntas, duracion, team) => {
    return async(dispatch, getState) => {

        const { usuarios } = getState().auth;

        if (team?.length === 0) {
            team = []
            usuarios?.filter(usuarios => usuarios?.estado === true && usuarios?.name !== 'Jordy')?.map(e => team.push({ label: e?.name, value: e?.id, team: false }))
        }

        let usuariosEvaluacion = []

        usuarios?.map(usuario => usuariosEvaluacion?.push({id: usuario?.id, intentos}))

        try {

            let urlId
            let idImage = 'idImagen'
            let image = 'image'

            if (video[0]?.video?.includes('embed')) {

                const urlSplit = video[0]?.video?.split('/')
        
                urlId = urlSplit[4]

                const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDVPoMC3k0GlLy6q3Qy19ljRA2LGMnqcRU&channelId=UCMq8MYv0-X1XC17vnVRfwpw&part=snippet,id&id=${urlId}`)

                idImage = urlId
                image = data?.items[0].snippet?.thumbnails?.maxres?.url
            }

            const resp = await salonApi.post(`/capacitacion/new`, {title, image, idImage, descripcion, intentos, video, Preguntas, duracion, team, usuariosEvaluacion})
    
            dispatch(uploadFinish())
            dispatch(toUpdate(resp.data.capacitacion))
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

export const actualizarCapacitacionForm = (title, descripcion, intentos, video, Preguntas, duracion, team) => {
    return async(dispatch, getState) => {

        const { paraEditar } = getState().cp;

        const { usuarios } = getState().auth;
        
        if (team?.length === 0) {
            team = []
            usuarios?.filter(usuarios => usuarios?.estado === true && usuarios?.name !== 'Jordy')?.map(e => team.push({ label: e?.name, value: e?.id, team: false }))
        }

        let usuariosEvaluacion = []

        if (paraEditar?.intentos !== intentos) {
            
            paraEditar?.usuariosEvaluacion?.map(e => (
                usuariosEvaluacion.push({id: e?.id, intentos})
            ))

        } else {
            usuariosEvaluacion = paraEditar?.usuariosEvaluacion
        }
        
        try {

            let idImage = paraEditar?.idImage
            let image = paraEditar?.image

            const urlSplit = video[0]?.video?.split('/')

            const urlId = urlSplit[4]

            console.log(video[0]?.video?.includes('embed') && paraEditar?.idImage !== urlId)

            if (video[0]?.video?.includes('embed') && paraEditar?.idImage !== urlId) {

                const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDVPoMC3k0GlLy6q3Qy19ljRA2LGMnqcRU&channelId=UCMq8MYv0-X1XC17vnVRfwpw&part=snippet,id&id=${urlId}`)

                idImage = urlId
                image = (data?.items[0].snippet?.thumbnails?.maxres?.url) ? data?.items[0].snippet?.thumbnails?.maxres?.url : (data?.items[0].snippet?.thumbnails?.high?.url) ? data?.items[0].snippet?.thumbnails?.high?.url : data?.items[0].snippet?.thumbnails?.default?.url
            }
            const resp = await salonApi.put(`/capacitacion/update/${paraEditar?._id}`, {title, image, idImage, descripcion, intentos, video, Preguntas, duracion, team, usuariosEvaluacion})
    
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

        } catch (error) {
            console.log(error)
        }
        
    }
}

export const publicarCapacitacion = (capacitacion, publicar) => {
    return async(dispatch) => {

        const resp = await salonApi.put(`/capacitacion/update/${capacitacion?._id}`, {...capacitacion, publicar})
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
            const resp = await salonApi.delete(`/capacitacion/delete/${props?._id}`)

            if (evaluacionFiltrada?.length !== 0) {
                await salonApi.post(`/evaluacion/delete`, evaluacionFiltrada)
            }

            dispatch(deleteCapacitacion(resp.data.capacitacion))

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
    
//                 await salonApi.delete(`/fileUpload/${element?.idVideo}`)
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