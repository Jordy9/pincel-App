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

    const { evaluacionFilterSlice } = useSelector(state => state.ev);

    const { id, name, urlImage, team:usuarioTeam } = props

    const calificacionEvaluacion = evaluacionFilterSlice?.filter(evaluacion => capacitacion?.some(capacitacion => evaluacion?.idCapacitacion === capacitacion?._id && capacitacion?.publicar === true && capacitacion?.EvaluatShow === true && capacitacion?.team?.some(team => team?.value === usuarioTeam)) && evaluacion?.idUsuario === id)

    const cantidadVideosFiltradas = capacitacion?.filter(capacitacion => capacitacion?.publicar === true && capacitacion?.video?.some(video => video?.check?.some(check => check?.id === id)))

    let video = []

    let videosTotales = []

    let checkVideo = []

    cantidadVideosFiltradas?.map(videos => video?.push(...videos?.video))

    video?.map(video => video?.check?.some(check => check?.id === id && checkVideo.push(video)))

    capacitacion?.map(videos => videos?.publicar === true && videos?.team?.some(team => team?.value === id || team?.value === usuarioTeam) && videosTotales?.push(...videos?.video))

    const handledActive = (user) => {
        dispatch(setActiveUser(user))
        dispatch(modalOpen())
    }

    let sumaPorcentage = []

    capacitacion?.filter(
        capacitacion => capacitacion?.publicar === true 
          && 
        capacitacion?.team?.some(team => team?.value === id || team?.value === usuarioTeam)
      )?.map(({video, _id, EvaluatShow}) => {
        const CantidadCheck = video?.filter(video => video?.check?.some(check => check?.id === id))
    
        const evaluacionFilt = evaluacionFilterSlice?.filter(evaluacion => evaluacion?.idUsuario === id && evaluacion?.idCapacitacion === _id)
    
        const porcentaje = parseInt((CantidadCheck?.length / video?.length) * 100)
        return (
          (porcentaje === 100 && (evaluacionFilt?.length !== 0 || !EvaluatShow)) && sumaPorcentage.push(porcentaje)
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

    const porcientoVideos = (checkVideo?.length / videosTotales?.length) * 100

    let evaluacionPlural = (calificacionEvaluacion?.length > 1)

    const filterCapId = capacitacion?.filter(capacitacion => capacitacion?.team?.some(team => team?.value === id))

    let IdShowCap

    if (filterCapId?.length > 1) {
        IdShowCap = `, ${filterCapId?.length} capacitaciones particulares`
    } else if (filterCapId?.length === 1) {
        IdShowCap = `, ${filterCapId?.length} capacitación particular`
    }

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

    let sumaCalific = 0

    calificacionEvaluacion?.map(evC => sumaCalific = sumaCalific + evC?.calificacion)

    const calificacionFinalUsuario = Number((sumaCalific / calificacionEvaluacion?.length)?.toFixed()) || 0

    const promedioGeneralDelUsuario = (calificacionFinalUsuario + sumaPorcentage0) / 2

    const filterCapTeam = capacitacion?.filter(capacitacion => capacitacion?.team?.some(team => team?.value === usuarioTeam))

    const calBase5 = ( sumaPorcentage0*5 ) /100

  return (
    <tr style={{cursor: 'pointer'}} onTouchStart = {(e) => onDoubleTap(e, handledActive, usuarioCompleto)} onDoubleClick={() => handledActive(usuarioCompleto)} data-bs-toggle="tooltip" data-bs-placement="left" title="Haga doble click sobre un usuario para ver su detalle">
        {
            (isShow && (sumaPorcentage0 !== 0 || calificacionEvaluacion?.length !== 0 || cantidadVideosFiltradas?.some(cap => cap?.EvaluatShow === false)))
                &&
            <>
                {
                    (respWidth > 992)
                        &&
                    <td className='d-flex justify-content-center'>
                        <div className='d-flex justify-content-center my-1' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                            <img src={(urlImage) ? urlImage : user} className='img-fluid' alt="" />
                        </div>
                    </td>
                }
                <td>{name}</td>
                <td className='d-flex justify-content-center mx-auto'>
                    <div className='d-flex justify-content-center' style={{width: '50px'}} data-bs-toggle="tooltip" data-bs-placement="left" title={`${(sumaPorcentage?.length !== 0) ? pluralLetraCapacitacion : '0 capacitaciones'}, ${(calificacionEvaluacion?.length !== 0) ? pluralLetra : '0 evaluaciones' } y una calificación ${(calificacionEvaluacion?.length !== 0 && filterCapTeam?.length !== 0) ?  `de ${calificacionFinalUsuario}` : 'Incompleta'}${(filterCapId?.length !== 0) ? IdShowCap : ''}`}>
                        <CircularProgressbar styles={buildStyles({pathColor: 'rgb(71, 7, 168)', textColor: 'rgb(71, 7, 168)', textSize: '30px'}) } value={porcientoVideos || 0} text={`${(calificacionEvaluacion?.length !== 0 && filterCapTeam?.length !== 0) ? calificacionFinalUsuario : '-'}`} />
                    </div>
                </td>
                <td data-bs-toggle="tooltip" data-bs-placement="left" title={`${division} Reseñas`}>{parseInt(suma/division) || 0}</td>
                <td>{promedioGeneralDelUsuario || 0}</td>
                <td>{formatearNumero(calBase5) || 0} <i style={{ color: 'gold' }} className="bi bi-star-fill"></i></td>
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
                        <div className='d-flex justify-content-center my-1' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                            <img src={(urlImage) ? urlImage : user} className='img-fluid' alt="" />
                        </div>
                    </td>
                }
                <td>{name}</td>
                <td className='d-flex justify-content-center mx-auto'>
                    <div className='d-flex justify-content-center' style={{width: '50px'}} data-bs-toggle="tooltip" data-bs-placement="left" title={`${(sumaPorcentage?.length !== 0) ? pluralLetraCapacitacion : '0 capacitaciones'}, ${(calificacionEvaluacion?.length !== 0) ? pluralLetra : '0 evaluaciones' } y una calificación ${(calificacionEvaluacion?.length !== 0 && filterCapTeam?.length !== 0) ?  `de ${calificacionFinalUsuario}` : 'Incompleta'}${(filterCapId?.length !== 0) ? IdShowCap: ''}`}>
                        <CircularProgressbar styles={buildStyles({pathColor: 'rgb(71, 7, 168)', textColor: 'rgb(71, 7, 168)', textSize: '30px'}) } value={porcientoVideos || 0} text={`${(calificacionEvaluacion?.length !== 0 && filterCapTeam?.length !== 0) ? calificacionFinalUsuario : '-'}`} />
                    </div>
                </td>
                <td data-bs-toggle="tooltip" data-bs-placement="left" title={`${division} Reseñas`}>{parseInt(suma/division) || 0}</td>
                <td>{promedioGeneralDelUsuario || 0}</td>
                <td>{formatearNumero(calBase5) || 0} <i style={{ color: 'gold' }} className="bi bi-star-fill"></i></td>
            </>
        }
    </tr>
  )
}

const formatearNumero = ( numero ) => {
    if (numero === Math.floor(numero)) {
      return numero.toString(); // Es un número entero, lo mostramos como está.
    } else {
      return numero.toFixed(1); // Es un número decimal, lo mostramos con un solo decimal.
    }
}