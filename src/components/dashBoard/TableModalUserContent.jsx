import React, { useState } from 'react'
import user from '../../heroes/user.webp'
import { useDispatch, useSelector } from 'react-redux'
import { activeEvaluacion } from '../../store/evaluacion/evaluacionSlice';
import { ModalEvaluacionUser } from './ModalEvaluacionUser';
import Swal from 'sweetalert2';

export const TableModalUserContent = (props) => {

    const dispatch = useDispatch();

    const { uid } = useSelector(state => state.auth);

    const { evaluacion } = useSelector(state => state.ev);

    const {title, image, video, _id} = props

    const calificacionEvaluacion = evaluacion?.filter(evaluacion => evaluacion?.idCapacitacion === _id)

    const cantidadVideosFiltradas = video?.filter(video => video?.check?.includes(uid))

    const porciento = (cantidadVideosFiltradas?.length/video?.length)*100

    const [modalShowEvaluacion, setModalShowEvaluacion] = useState(false)

    // const capacitacionFiltrada = capacitacion?.filter(capacitacion => capacitacion?._id === idCapacitacion)

    // console.log(capacitacion?.map(capacitacion => (
    //   capacitacion?.filter()
    // )))

    // const videosFiltrados = capacitacionFiltrada[0]?.video?.filter(video => video?.check?.includes(idUsuario))

    // const porciento = (videosFiltrados?.length/capacitacionFiltrada[0]?.video?.length)*100

  const handledActive = (id) => {
    const evaluacionFiltrada = evaluacion?.filter(evaluacion => evaluacion?.idCapacitacion === id)
    if (evaluacionFiltrada?.length !== 0) {
      dispatch(activeEvaluacion(evaluacionFiltrada[0]))
      setModalShowEvaluacion(true)
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
        icon: 'info',
        title: 'Este usuario aún no ha sido evaluado'
      })
    }
  }

  return (
    <tr style={{cursor: 'pointer'}} onDoubleClick={() => handledActive(_id)} data-bs-toggle="tooltip" data-bs-placement="left" title="Haga doble click sobre un usuario para ver su detalle">
        <td className='d-flex justify-content-center'>
            <div className='d-flex justify-content-center my-3' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                <img src={image || user} className='img-fluid' alt="" />
            </div>
        </td>
        <td>{title}</td>
        <td className='text-success'>{calificacionEvaluacion[0]?.calificacion || '-'}</td>
        <td>
          {
            (calificacionEvaluacion[0]?.calificacion)
              ?
            <i style={{fontSize: '25px'}} className="text-success bi bi-check-circle-fill"></i>
              :
            <div data-bs-toggle="tooltip" data-bs-placement="left" title={`${cantidadVideosFiltradas?.length}/${video?.length} videos vistos`} className="progress my-2">
              <div className="progress-bar" role="progressbar" style={{width: `${porciento}%`, backgroundColor: 'rgb(89, 7, 211)'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{porciento}%</div>
            </div>
          }
        </td>
        <ModalEvaluacionUser modalShowEvaluacion = {modalShowEvaluacion} setModalShowEvaluacion = {setModalShowEvaluacion} />
    </tr>
  )
}
