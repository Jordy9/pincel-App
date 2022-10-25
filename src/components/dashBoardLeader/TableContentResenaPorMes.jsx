import React from 'react'
import { useDispatch } from 'react-redux'
import { setActiveResena } from '../../store/resena/resenaSlice';
import { Rating } from 'react-simple-star-rating';
import moment from 'moment';
import { actualizarResena } from '../../store/resena/thunk';
import { onDoubleTap } from '../../helper/onDoubleTap';

export const TableContentResenaPorMes = (props) => {

    const dispatch = useDispatch();

    const { calificacion, descripcion, createdAt, setModalShowDetalle, estado } = props

    const handledActive = (resena) => {
        dispatch(setActiveResena(resena))
        setModalShowDetalle(true)
    }

    let suma = 0

    calificacion?.map(calificacion => suma = suma + calificacion?.calificacion)

    const sumaTotal = (suma / calificacion?.length)?.toFixed(1)

    const resenaUsuario = {
        id: props?._id,
        calificacion: Number(sumaTotal) || 0,
        descripcion,
        usuarios: calificacion
    }

  return (
    <tr className={`${(!estado) && 'bg-secondary'}`} onTouchStart = {(e) => onDoubleTap(e, handledActive, resenaUsuario)} onDoubleClick={() => handledActive(resenaUsuario)} style={{cursor: 'pointer'}}  data-bs-toggle="tooltip" data-bs-placement="left" title="Haga doble click sobre un usuario para ver su detalle">
        {
            (Number(sumaTotal) > 0)
                &&
                <>
                    <td>{<Rating size={19} readonly ratingValue={Number(sumaTotal)} />}</td>
                    <td>{descripcion}</td>
                    <td>{moment(createdAt).format('DD/MM/YYYY, h:mm a')}</td>
                    <td>             
                        <button onClick={() => dispatch(actualizarResena(props))} className='btn mx-1 my-1'><i style={{fontSize: '23px'}} className="bi bi-x-circle-fill text-danger"></i></button>
                    </td>
                </>
        }
    </tr>
  )
}
