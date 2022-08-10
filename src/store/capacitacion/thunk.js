import axios from "axios"
import Swal from "sweetalert2";
import { activeCapacitacion, actualizarCapacitacion, createCapacitacion, deleteCapacitacion, getCapacitacion, toSave, toUpdateClear, toUpdateSave, uploadCapacitacion, uploadFinish } from "./capacitacionSlice";

const endPoint = process.env.REACT_APP_API_URL

const token = localStorage.getItem('token') || '';

export const obtenerCapacitacion = () => {
    return async(dispatch) => {

        try {
            const resp = await axios.get(`${endPoint}/capacitacion`, {headers: {'x-token': token}})
    
            dispatch(getCapacitacion(resp.data.capacitacion))

            const capacitacionId = window.location.pathname.split('/')[2]

            const queryString = window.location.search.split('?q=')[1]

            let busquedaFiltrada

            const capacitacionFiltrada = resp.data.capacitacion?.filter(capacitacion => capacitacion?._id === capacitacionId)

            let filtro

            if (capacitacionFiltrada?.length !== 0) {
                busquedaFiltrada = capacitacionFiltrada?.map(capacitacion =>
                    filtro = capacitacion?.video?.filter(video => video?.idVideo === queryString),
                    )
                    dispatch(activeCapacitacion({videos: filtro[0] || capacitacionFiltrada[0]?.video[0], preguntas: capacitacionFiltrada[0]?.Preguntas}))
                }

        } catch (error) {
        }
        
    }
}

export const crearVideos = (video) => {
    return async(dispatch) => {
        
        const formData = new FormData()
        formData.append('file', video.video)
        formData.append('title', video.titulo)
        
        try {
            const resp = await axios.post(`${endPoint}/fileUpload`, formData, {
                headers: {'x-token': token}, 
                onUploadProgress: (e) =>
                {dispatch(uploadCapacitacion(Math.round( (e.loaded * 100) / e.total )))}
            })

            dispatch(toSave(resp.data.image))

            dispatch(uploadFinish())
    
        } catch (error) {
            console.log(error)
        }
        
    }
}

export const actualizarVideos = (video, indice, index) => {
    return async(dispatch, getState) => {

        const { capacitacion, paraEditar } = getState().cp;
        
        try {
            if (typeof video?.video !== 'string') {
                const formData = new FormData()
                formData.append('file', video.video)
                formData.append('title', video.titulo)
                
                const resp = await axios.post(`${endPoint}/fileUpload`, formData, {
                    headers: {'x-token': token}, 
                    onUploadProgress: (e) =>
                    {dispatch(uploadCapacitacion(Math.round( (e.loaded * 100) / e.total )))}
                })

                let nuevo

                if (paraEditar?.video[indice]) {
                    capacitacion?.map(capacitacion => (
                        capacitacion?.video[indice]?.idVideo === paraEditar?.video[indice]?.idVideo ? nuevo = resp.data.image : capacitacion
                    ))

                    nuevo.createdAt = paraEditar?.video[indice].createdAt
        
                    dispatch(toSave(nuevo))
                } else {
                    dispatch(toSave(resp.data.image))
                }


            } else {
                dispatch(toSave(paraEditar?.video[index]))
            }


            dispatch(uploadFinish())
    
        } catch (error) {
        }
        
    }
}

export const crearCapacitacion = (title, file, video, Preguntas, duracion, team) => {
    return async(dispatch) => {

        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', title + '123456')

        try {


            const respImage = await axios.post(`${endPoint}/fileUpload/imagen`, formData, {
                headers: {'x-token': token},
                onUploadProgress: (e) =>
                {dispatch(uploadCapacitacion(Math.round( (e.loaded * 100) / e.total )))}
            })

            const idImage = respImage.data.image.id
            const image = respImage.data.image.url

            const resp = await axios.post(`${endPoint}/capacitacion/new`, {title, image, idImage, video, Preguntas, duracion, team}, {headers: {'x-token': token}})
    
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

export const actualizarCapacitacionForm = (title, file, video, Preguntas, duracion, team) => {
    return async(dispatch, getState) => {

        const { paraEditar } = getState().cp;
        
        try {
            if (typeof file !== 'string') {

                const formData = new FormData()
                formData.append('file', file)
                formData.append('title', title + '123456')
    
                const respImage = await axios.post(`${endPoint}/fileUpload/imagen`, formData, {
                    headers: {'x-token': token},
                    onUploadProgress: (e) =>
                    {dispatch(uploadCapacitacion(Math.round( (e.loaded * 100) / e.total )))}
                })
    
                const idImage = respImage.data.image.id
                const image = respImage.data.image.url
    
                const resp = await axios.post(`${endPoint}/capacitacion/new`, {title, image, idImage, video, Preguntas, duracion, team}, {headers: {'x-token': token}})
        
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
                const resp = await axios.put(`${endPoint}/capacitacion/update/${paraEditar?._id}`, {title, image, idImage, video, Preguntas, duracion, team}, {headers: {'x-token': token}})
        
                dispatch(uploadFinish())
                dispatch(actualizarCapacitacion(resp.data.capacitacion))
                dispatch(toUpdateClear())

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

            dispatch(eliminarCapacitacionVideos(props?.video))

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

const eliminarCapacitacionVideos = (videos) => {
    return async(dispatch) => {

        for (let index = 0; index < videos.length; index++) {
            const element = videos[index];
            
            try {
    
                await axios.delete(`${endPoint}/fileUpload/${element?.idVideo}`, {headers: {'x-token': token}})
            } catch (error) {
                console.log(error)
            }
        }
        
    }
}

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