import React, { useState } from 'react'
import { CapacitacionTema } from './CapacitacionTema'
import { Sidebar } from './Sidebar'
import { Container } from 'react-bootstrap'
import { Navb } from '../navb/Navb'
import { useSelector } from 'react-redux'
import { ModalEvaluacion } from './ModalEvaluacion'

export const VideosComponent = () => {

  const { noMostrarBoton, capacitacionActiva } = useSelector(state => state.cp);

  const { uid } = useSelector(state => state.auth);

  const { evaluacion } = useSelector(state => state.ev);

  const evaluacionCompleta = evaluacion?.filter(evaluacion => evaluacion?.idCapacitacion === capacitacionActiva?._id && evaluacion?.idUsuario === uid)

  const [modalShowEvaluacion, setModalShowEvaluacion] = useState(false)

  return (
      <>
      <Navb />
        <Container className='my-4'>
          <div className='text-black'>
              <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
                      <CapacitacionTema />

                      <h4 className='mt-4'>Descripcion general</h4>
                      <p style={{fontSize: '17px'}}>{capacitacionActiva?.descripcion}</p>
                  </div>

                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4" style={{overflowY: 'auto'}}>
                    <Sidebar />
                  </div>
              </div>
          </div>

        </Container>

        {
          (modalShowEvaluacion)
            &&
          <ModalEvaluacion modalShowEvaluacion = {modalShowEvaluacion} setModalShowEvaluacion = {setModalShowEvaluacion} />
        }

        <div style={{position: 'fixed', marginTop: '-80px', marginLeft: '-75px', left: '50%', top: '95%', zIndex: 1045}}>
          <button onClick={() => setModalShowEvaluacion(true)} hidden = {noMostrarBoton} className='btn btn-primary btn-lg'>{(evaluacionCompleta?.length !== 0) ? 'Ver resultado' : 'Tomar evaluación'}</button>
        </div>
      </>
  )
}
