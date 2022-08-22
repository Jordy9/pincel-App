import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveResena } from '../../store/resena/resenaSlice';
import { Rating } from 'react-simple-star-rating';
import moment from 'moment';
import { actualizarResena } from '../../store/resena/thunk';

export const TableContentResena = (props) => {

    const dispatch = useDispatch();

    const { calificacion, descripcion, createdAt, setModalShowDetalle, estado } = props

    const { activeUser } = useSelector(state => state.auth);

    let clicks = []
    let time = ""

    const handledActive = (resena) => {
        clicks.push(new Date().getTime())
        time = window.setTimeout(() => {
            if (clicks?.length > 1 && (clicks[clicks.length-1] - clicks[clicks.length -2]) < 300) {
                dispatch(setActiveResena(resena))
                setModalShowDetalle(true)
            }
        }, 0);
    }

    const calificacionFiltrada = calificacion?.filter(calificacion => calificacion?.id === activeUser?.id)

    const calificacionArgumento = calificacionFiltrada[0]?.calificacion

    const resenaUsuario = {
        id: props?._id,
        calificacion: calificacionArgumento || 0,
        descripcion
    }

  return (
    <tr className={`${(!estado) && 'bg-secondary'}`} onClick={() => handledActive(resenaUsuario)} style={{cursor: 'pointer'}}  data-bs-toggle="tooltip" data-bs-placement="left" title="Haga doble click sobre un usuario para ver su detalle">
        {
            (calificacionFiltrada[0]?.calificacion > 0)
                &&
                <>
                    <td>{<Rating size={20} readonly ratingValue={calificacionFiltrada[0]?.calificacion} />}</td>
                    <td>{descripcion}</td>
                    <td>{moment(createdAt).format('MMMM Do YYYY')}</td>
                    <td>             
                        <button onClick={() => dispatch(actualizarResena(props))} className='btn mx-1 my-1'><i style={{fontSize: '23px'}} className="bi bi-x-octagon text-danger"></i></button>
                    </td>
                </>
        }
    </tr>
  )
}
