import React, { useState } from 'react'
import { CapacitacionTema } from './CapacitacionTema'
import { Sidebar } from './Sidebar'
import { Container } from 'react-bootstrap'
import { Navb } from '../navb/Navb'
import { useSelector } from 'react-redux'
import { ModalEvaluacion } from './ModalEvaluacion'

export const VideosComponent = () => {

  const { noMostrarBoton, capacitacionActiva } = useSelector(state => state.cp);

  const [modalShowEvaluacion, setModalShowEvaluacion] = useState(false)

  return (
      <>
      <Navb />
        <Container className='my-4'>
          <button onClick={() => setModalShowEvaluacion(true)} hidden = {noMostrarBoton} className='btn btn-primary form-control mb-3'>Tomar evaluación</button>
          <div className='text-black'>
              <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
                      <CapacitacionTema />

                      <h4 className='p-4'>Descripcion general</h4>
                      <p className='p-4'>{capacitacionActiva?.descripcion}</p>
                  </div>

                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
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

      </>
  )
}
