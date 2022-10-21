import React from 'react'
import user from '../../heroes/user.webp'
import { useDispatch, useSelector } from 'react-redux'
import { modalOpen, setActiveUser } from '../../store/auth/authSlice';
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import { useResponsive } from '../../hooks/useResponsive';
import { onDoubleTap } from '../../helper/onDoubleTap';

export const TableContent = (props) => {

    const dispatch = useDispatch();

    const { resenaFilterSlice, isShow } = useSelector(state => state.rs);

    const { capacitacion } = useSelector(state => state.cp);

    const { evaluacion } = useSelector(state => state.ev);

    const { id, name, urlImage, team:usuarioTeam } = props

    const calificacionEvaluacion = evaluacion?.filter(evaluacion => capacitacion?.some(capacitacion => evaluacion?.idCapacitacion === capacitacion?._id) && evaluacion?.idUsuario === id)

    const cantidadVideosFiltradas = capacitacion?.filter(capacitacion => capacitacion?.video?.some(video => video?.check?.includes(id)))

    let video = []

    cantidadVideosFiltradas?.map(videos => video?.push(videos?.video))

    const handledActive = (user) => {
        dispatch(setActiveUser(user))
        dispatch(modalOpen())
    }

    let sumaPorcentage = []

    capacitacion?.filter(
        capacitacion => capacitacion?.publicar === true 
          && 
        capacitacion?.team?.some(team => team?.value === id || team?.value === usuarioTeam)
      )?.map(({video, _id}) => {
        const CantidadCheck = video?.filter(video => video?.check?.includes(id))
    
        const evaluacionFilt = evaluacion?.filter(evaluacion => evaluacion?.idUsuario === id && evaluacion?.idCapacitacion === _id)
    
        const porcentaje = parseInt((CantidadCheck?.length / video?.length) * 100)
        return (
          (porcentaje === 100 && evaluacionFilt?.length !== 0) && sumaPorcentage.push(porcentaje)
        )
      })

    let calificacionFiltrada = []

    resenaFilterSlice?.filter(resena => resena?.estado !== false)?.map(resena => {
        return (
            (resena?.calificacion?.filter(resena => resena?.id === id))
                &&
            calificacionFiltrada.push(resena?.calificacion?.filter(resena => resena?.id === id))
        )
    })
    
    let suma = 0
    let division = 0

    calificacionFiltrada?.map((calificacion) => {
        if (calificacion[0]?.id === id) {
            division += 1
        }
        return suma += calificacion[0]?.calificacion || 0
    })

    const usuarioCompleto = {
        ...props,
        calificacion: parseInt(suma/division) || 0,
        cantidad: division
    }

    // const capacitacionesFiltradasPorVideo = capacitacion?.filter(capacitacion => capacitacion?.video)

    const [ respWidth ] = useResponsive()

    const sumaPorcentage0 = parseInt(suma/division) || 0

    const porcientoVideos = (calificacionEvaluacion?.length !== 0) ? ((cantidadVideosFiltradas?.length + 1)/(video?.length + 1)) * 100 : (cantidadVideosFiltradas?.length/(video?.length + 1)) * 100

    let evaluacionPlural = (calificacionEvaluacion?.length > 1)

    let pluralLetra

    if (evaluacionPlural) {
        pluralLetra = `${calificacionEvaluacion?.length} evaluaciones`
    } else {
        pluralLetra = `${calificacionEvaluacion?.length} evaluación`
    }

    let capacitacionPlural = (sumaPorcentage?.length > 1)

    let pluralLetraCapacitacion

    if (capacitacionPlural) {
        pluralLetraCapacitacion = `${sumaPorcentage?.length} capacitaciones`
    } else {
        pluralLetraCapacitacion = `${sumaPorcentage?.length} capacitación`
    }

  return (
    <tr style={{cursor: 'pointer'}} onTouchStart = {(e) => onDoubleTap(e, handledActive, usuarioCompleto)} onDoubleClick={() => handledActive(usuarioCompleto)} data-bs-toggle="tooltip" data-bs-placement="left" title="Haga doble click sobre un usuario para ver su detalle">
        {
            (isShow && (sumaPorcentage0 !== 0 || capacitacionPlural))
                &&
            <>
                {
                    (respWidth > 992)
                        &&
                    <td className='d-flex justify-content-center'>
                        <div className='d-flex justify-content-center my-3' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                            <img src={(urlImage) ? urlImage : user} className='img-fluid' alt="" />
                        </div>
                    </td>
                }
                <td>{name}</td>
                <td className='d-flex justify-content-center mx-auto'>
                    <div className='d-flex justify-content-center' style={{width: '50px'}} data-bs-toggle="tooltip" data-bs-placement="left" title={`${(sumaPorcentage?.length !== 0) ? pluralLetraCapacitacion : '0 capacitaciones'}, ${(calificacionEvaluacion?.length !== 0) ? pluralLetra : '0 evaluaciones' } y una calificación ${(calificacionEvaluacion?.length !== 0 && cantidadVideosFiltradas?.length !== 0) ?  `de ${calificacionEvaluacion[0]?.calificacion}` : 'Incompleta'}`}>
                        <CircularProgressbar styles={buildStyles({pathColor: 'rgb(71, 7, 168)', textColor: 'rgb(71, 7, 168)', textSize: '30px'}) } value={porcientoVideos || 0} text={`${(calificacionEvaluacion?.length !== 0 && cantidadVideosFiltradas?.length !== 0) ? calificacionEvaluacion[0]?.calificacion : '-'}`} />
                    </div>
                </td>
                <td data-bs-toggle="tooltip" data-bs-placement="left" title={`${division} Reseñas`}>{parseInt(suma/division) || 0}</td>
            </>
        }

        {
            (!isShow)
                &&
                <>
                {
                    (respWidth > 992)
                        &&
                    <td className='d-flex justify-content-center'>
                        <div className='d-flex justify-content-center my-3' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                            <img src={(urlImage) ? urlImage : user} className='img-fluid' alt="" />
                        </div>
                    </td>
                }
                <td>{name}</td>
                <td className='d-flex justify-content-center mx-auto'>
                    <div className='d-flex justify-content-center' style={{width: '50px'}} data-bs-toggle="tooltip" data-bs-placement="left" title={`${(sumaPorcentage?.length !== 0) ? pluralLetraCapacitacion : '0 capacitaciones'}, ${(calificacionEvaluacion?.length !== 0) ? pluralLetra : '0 evaluaciones' } y una calificación ${(calificacionEvaluacion?.length !== 0 && cantidadVideosFiltradas?.length !== 0) ?  `de ${calificacionEvaluacion[0]?.calificacion}` : 'Incompleta'}`}>
                        <CircularProgressbar styles={buildStyles({pathColor: 'rgb(71, 7, 168)', textColor: 'rgb(71, 7, 168)', textSize: '30px'}) } value={porcientoVideos || 0} text={`${(calificacionEvaluacion?.length !== 0 && cantidadVideosFiltradas?.length !== 0) ? calificacionEvaluacion[0]?.calificacion : '-'}`} />
                    </div>
                </td>
                <td data-bs-toggle="tooltip" data-bs-placement="left" title={`${division} Reseñas`}>{parseInt(suma/division) || 0}</td>
            </>
        }
    </tr>
  )
}
