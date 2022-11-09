import React, { useState } from 'react'
import { CapacitacionTema } from './CapacitacionTema'
import { Sidebar } from './Sidebar'
import { Container } from 'react-bootstrap'
import { Navb } from '../navb/Navb'
import { useSelector } from 'react-redux'
import { ModalEvaluacion } from './ModalEvaluacion'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { tomandoEvaluacion } from '../../store/enEvaluacion/thunk'
import Swal from 'sweetalert2'

export const VideosComponent = () => {

  const dispatch = useDispatch();

  const { noMostrarBoton, capacitacionActiva, capacitacion } = useSelector(state => state.cp);

  const { uid, usuarioActivo } = useSelector(state => state.auth);

  const { evaluacion } = useSelector(state => state.ev);

  const navigate = useNavigate()

  const evaluacionCompleta = evaluacion?.filter(evaluacion => evaluacion?.idCapacitacion === capacitacionActiva?._id && evaluacion?.idUsuario === uid)

  const [modalShowEvaluacion, setModalShowEvaluacion] = useState(false)
  
  const capacitacionFilt = capacitacion?.filter(capacitacion => capacitacion?._id === capacitacionActiva?._id && capacitacion?.team?.some(team => team?.value === usuarioActivo?.team || team?.value === uid || usuarioActivo?.role === 'Administrador'))

  useEffect(() => {
    if (capacitacionActiva && capacitacionFilt?.length === 0) {
      navigate('/capacitacion', { replace: true })
    }
  }, [capacitacionActiva?._id])

  const calificacion = evaluacionCompleta?.filter(evaluacion => evaluacion?.idCapacitacion === capacitacionActiva?._id)

  const intentos = capacitacionActiva?.usuariosEvaluacion?.filter(usuario => usuario?.id === uid)

  const tomarEv = () => {
    if (capacitacionActiva?.intentos > intentos[0]?.intentos && intentos[0]?.intentos > 0) {
      Swal.fire({
        title: 'Si toma la evaluación de nuevo, solo se tomará en cuenta su nueva calificación',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'No por ahora',
        confirmButtonColor: 'rgb(0, 197, 0)',
        cancelButtonColor: 'rgb(0, 197, 0)',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(tomandoEvaluacion(capacitacionActiva?._id, uid, capacitacionActiva))
          navigate(`/evaluacionCapacitacion/${capacitacionActiva?._id}`)
        }
      })
    } else {
      dispatch(tomandoEvaluacion(capacitacionActiva?._id, uid, capacitacionActiva))
      navigate(`/evaluacionCapacitacion/${capacitacionActiva?._id}`)
    }
  }

  useEffect(() => {
    if (!capacitacionActiva) {
      navigate('/capacitacion', { replace: true })
    }
  }, [])
  
  return (
      <>
      <Navb />
        <Container className='my-4'>
          <div className='text-black'>
              <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
                      <CapacitacionTema />

                      <h4 className='my-3'>{capacitacionActiva?.title}</h4>
                      <h4>Descripcion general</h4>
                      <p style={{fontSize: '17px'}}>{capacitacionActiva?.descripcion}</p>
                  </div>

                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-5" style={{overflowY: 'auto'}}>
                    <Sidebar />
                  </div>
              </div>

              <div className='text-center mb-5'>
                <button onClick={tomarEv} disabled = {(intentos && intentos[0]?.intentos === 0)} hidden = {noMostrarBoton} className='btn btn-primary btn-lg'>{(evaluacionCompleta?.length !== 0 && (intentos[0]?.intentos === 0)) ? `Calificación: ${calificacion[0]?.calificacion} / 100` : (intentos && capacitacionActiva?.intentos > intentos[0]?.intentos && intentos[0]?.intentos > 0) ? `Volver a intentar, calificación: ${calificacion[0]?.calificacion} / 100` : 'Tomar evaluación'}</button>
              </div>
          </div>

        </Container>

        {
          (modalShowEvaluacion)
            &&
          <ModalEvaluacion modalShowEvaluacion = {modalShowEvaluacion} setModalShowEvaluacion = {setModalShowEvaluacion} />
        }
      </>
  )
}
