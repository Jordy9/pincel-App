import axios from "axios"
import { activeCapacitacion, createCapacitacion, getCapacitacion, toSave, uploadCapacitacion, uploadFinish } from "./capacitacionSlice";

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
                    dispatch(activeCapacitacion(filtro[0]))
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

        } catch (error) {
            console.log(error)
        }
        
    }
}

export const checkVideoUser = (id, idVideo, uid) => {
    return (dispatch, getState) => {
        const { socket } = getState().sk;

        socket?.emit('check-video-capacitacion', {id, idVideo, uid})
    }
}