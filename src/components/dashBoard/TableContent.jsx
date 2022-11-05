import React from 'react'
import user from '../../heroes/user.webp'
import { useDispatch, useSelector } from 'react-redux'
import { modalOpen, setActiveUser } from '../../store/auth/authSlice';
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import { useResponsive } from '../../hooks/useResponsive';
import { onDoubleTap } from '../../helper/onDoubleTap';

export const TableContent = (props) => {

    const dispatch = useDispatch();

    const { isShow } = useSelector(state => state.rs);

    const { capacitacion } = useSelector(state => state.cp);

    const { evaluacionFilterSlice } = useSelector(state => state.ev);

    const { id, name, urlImage, team: usuarioTeam, sumaPorcentage0, calificacionFinalUsuario, promedioGeneralDelUsuario, division } = props

    const calificacionEvaluacion = evaluacionFilterSlice?.filter(evaluacion => capacitacion?.some(capacitacion => evaluacion?.idCapacitacion === capacitacion?._id && capacitacion?.publicar === true && capacitacion?.EvaluatShow === true && capacitacion?.team?.some(team => team?.value === usuarioTeam)) && evaluacion?.idUsuario === id)

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

    const usuarioCompleto = {
        ...props,
        calificacion: sumaPorcentage0,
        cantidad: division
    }

    // const capacitacionesFiltradasPorVideo = capacitacion?.filter(capacitacion => capacitacion?.video)

    const [ respWidth ] = useResponsive()

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

    const filterCapTeam = capacitacion?.filter(capacitacion => capacitacion?.team?.some(team => team?.value === usuarioTeam))

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
                        <div className='d-flex justify-content-center my-3' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
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
                <td data-bs-toggle="tooltip" data-bs-placement="left" title={`${division} Reseñas`}>{sumaPorcentage0}</td>
                <td>{promedioGeneralDelUsuario || 0}</td>
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
                    <div className='d-flex justify-content-center' style={{width: '50px'}} data-bs-toggle="tooltip" data-bs-placement="left" title={`${(sumaPorcentage?.length !== 0) ? pluralLetraCapacitacion : '0 capacitaciones'}, ${(calificacionEvaluacion?.length !== 0) ? pluralLetra : '0 evaluaciones' } y una calificación ${(calificacionEvaluacion?.length !== 0 && filterCapTeam?.length !== 0) ?  `de ${calificacionFinalUsuario}` : 'Incompleta'}${(filterCapId?.length !== 0) ? IdShowCap: ''}`}>
                        <CircularProgressbar styles={buildStyles({pathColor: 'rgb(71, 7, 168)', textColor: 'rgb(71, 7, 168)', textSize: '30px'}) } value={porcientoVideos || 0} text={`${(calificacionEvaluacion?.length !== 0 && filterCapTeam?.length !== 0) ? calificacionFinalUsuario : '-'}`} />
                    </div>
                </td>
                <td data-bs-toggle="tooltip" data-bs-placement="left" title={`${division} Reseñas`}>{sumaPorcentage0}</td>
                <td>{promedioGeneralDelUsuario || 0}</td>
            </>
        }
    </tr>
  )
}
