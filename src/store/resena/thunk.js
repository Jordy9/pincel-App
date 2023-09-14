import Swal from "sweetalert2"
import salonApi from '../../salonApi/salonApi';
import { comenzarResena, createAResena, createResena, deleteAResena, DeleteResena, filterResenaSlice, getResena, getToResena, setClearResena, UpdateResena } from './resenaSlice';

export const obtenerResena = (inicio, fin, setIsLoading) => {
    return async(dispatch) => {

        setIsLoading(true)
        
        try {
            const resp = await salonApi.get(`/resena?inicio=${inicio}&fin=${fin}`)
    
            dispatch(getResena(resp.data.resena))

            dispatch(filterResenaSlice(resp.data.resena))

            if (resp.data.ok) {
                setIsLoading(false)
            }

        } catch (error) {
        }
        
    }
}

export const obtenerToResena = () => {
    return async(dispatch) => {

        try {
            const resp = await salonApi.get(`/resena/To`)
    
            dispatch(getToResena(resp.data.Toresena))

        } catch (error) {
        }
        
    }
}

export const crearResena = (calificacion, descripcion, handleClose, setIdUsuarios) => {
    return async(dispatch) => {

        try {
            if (calificacion?.length !== 0) {

                const resp = await salonApi.post(`/resena/new`, {calificacion, descripcion})
        
                dispatch(createResena(resp.data.resena))
    
                dispatch(setClearResena())
    
                dispatch(comenzarResena(true))
    
                handleClose()

                setIdUsuarios([])
    
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
                    title: 'Reseña creada correctamente'
                })
            } else {
                Swal.fire(
                    'Asegúrese de que haya seleccionado y calificacdo al personal de forma correcta',
                    'intente evaluar nuevamente por favor.',
                    'error'
                )

                dispatch(setClearResena())
    
                dispatch(comenzarResena(true))
    
                handleClose()

                setIdUsuarios([])

                return
            }

        } catch (error) {
            console.log(error)
        }
        
    }
}

export const crearAResena = (usuario) => {
    return async(dispatch, getState) => {

        const { AResena } = getState().rs;
        const condicion = AResena?.filter(rs => rs?.id === usuario?.id)

        if (condicion?.length !== 0) {
            dispatch(deleteAResena(usuario))
        } else {
            dispatch(createAResena(usuario))
        }
        
    }
}

export const actualizarResena = (props) => {
    return async(dispatch) => {
        const {_id, calificacion, descripcion} = props

        const estado = !props.estado

        try {
            const resp = await salonApi.put(`/resena/update/${_id}`, {calificacion, descripcion, estado})
    
            dispatch(UpdateResena(resp.data.resena))

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
                title: 'Reseña actualizada correctamente'
            })

        } catch (error) {
            console.log(error)
        }
        
    }
}

export const eliminarResena = (id) => {
    return async(dispatch) => {

        try {
            await salonApi.delete(`/resena/delete/${id}`)
    
            dispatch(DeleteResena(id))

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
                title: 'Reseña eliminada correctamente'
            })

        } catch (error) {
            console.log(error)
        }
        
    }
}

export const showError = () => {
    return (dispatch) => {
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
            title: 'Las fechas a filtrar deben tener una diferencia de 12 meses'
        })
    }
}