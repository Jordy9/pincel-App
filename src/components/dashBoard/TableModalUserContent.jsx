import React, { useState } from 'react'
import user from '../../heroes/user.webp'
import { useDispatch, useSelector } from 'react-redux'
import { activeEvaluacion } from '../../store/evaluacion/evaluacionSlice';
import { ModalEvaluacionUser } from './ModalEvaluacionUser';
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import Swal from 'sweetalert2';
import { onDoubleTap } from '../../helper/onDoubleTap';

export const TableModalUserContent = (props) => {

    const dispatch = useDispatch();

    const { activeUser } = useSelector(state => state.auth);

    const { evaluacion } = useSelector(state => state.ev);

    const {title, image, video, _id, EvaluatShow} = props

    const calificacionEvaluacion = evaluacion?.filter(evaluacion => evaluacion?.idCapacitacion === _id && evaluacion?.idUsuario === activeUser?.id)

    const cantidadVideosFiltradas = video?.filter(video => video?.check?.includes(activeUser?.id))

    const porciento = (cantidadVideosFiltradas?.length/video?.length)*100

    const [modalShowEvaluacion, setModalShowEvaluacion] = useState(false)

    // const capacitacionFiltrada = capacitacion?.filter(capacitacion => capacitacion?._id === idCapacitacion)

    // console.log(capacitacion?.map(capacitacion => (
    //   capacitacion?.filter()
    // )))

    // const videosFiltrados = capacitacionFiltrada[0]?.video?.filter(video => video?.check?.includes(idUsuario))

    // const porciento = (videosFiltrados?.length/capacitacionFiltrada[0]?.video?.length)*100

  const handledActive = () => {
    if (calificacionEvaluacion?.length !== 0 && cantidadVideosFiltradas?.length !== 0) {
      dispatch(activeEvaluacion(calificacionEvaluacion[0]))
      setModalShowEvaluacion(true)
    } else {
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
        icon: 'info',
        title: 'Este usuario aún no ha sido evaluado completamente en esta capacitación'
      })
    }
  }

  const porcientoVideos = (calificacionEvaluacion?.length !== 0 || !EvaluatShow) ? (cantidadVideosFiltradas?.length === 0) ? (cantidadVideosFiltradas?.length/(video?.length + 1)) * 100 : ((cantidadVideosFiltradas?.length + 1)/(video?.length + 1)) * 100 : (cantidadVideosFiltradas?.length/(video?.length + 1)) * 100

  let mostrarCalificacionTooltip

  if (calificacionEvaluacion?.length !== 0 && cantidadVideosFiltradas?.length !== 0) {
    mostrarCalificacionTooltip = (EvaluatShow) 
      ? 
    `y una calificación de ${calificacionEvaluacion[0]?.calificacion}` 
      : 
    (calificacionEvaluacion[0]?.calificacion >= 0) 
      ? 
    `y una calificación de ${calificacionEvaluacion[0]?.calificacion}, la evaluación de esta capacitación está desactivada` 
      : 
    ''
  } else {
    mostrarCalificacionTooltip = (EvaluatShow) ? `y una calificación incompleta` : ''
  }

  return (
    <tr style={{cursor: 'pointer'}} onTouchStart = {(e) => onDoubleTap(e, handledActive, _id)} onDoubleClick={() => handledActive(_id)} data-bs-toggle="tooltip" data-bs-placement="left" title="Haga doble click sobre un usuario para ver su detalle">
        <td className='d-flex justify-content-center'>
            <div className='d-flex justify-content-center my-3' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                <img src={image || user} className='img-fluid' alt="" />
            </div>
        </td>
        <td>{title}</td>
        <td className='d-flex justify-content-center mx-auto'>
          <div className='d-flex justify-content-center' style={{width: '50px'}} data-bs-toggle="tooltip" data-bs-placement="left" title={`${cantidadVideosFiltradas?.length}/${video?.length} videos vistos, ${(calificacionEvaluacion?.length !== 0) ? '1 evaluación' : (!EvaluatShow) ? 'Esta capacitación no tiene evaluación' : 'No ha tomado la evaluación' } ${mostrarCalificacionTooltip}`}>
              <CircularProgressbar styles={buildStyles({pathColor: 'rgb(71, 7, 168)', textColor: 'rgb(71, 7, 168)', textSize: '30px'}) } value={porcientoVideos || 0} text={`${(calificacionEvaluacion?.length !== 0 && cantidadVideosFiltradas?.length !== 0) ? calificacionEvaluacion[0]?.calificacion : '-'}`} />
          </div>
        </td>
        <ModalEvaluacionUser modalShowEvaluacion = {modalShowEvaluacion} setModalShowEvaluacion = {setModalShowEvaluacion} />
    </tr>
  )
}
