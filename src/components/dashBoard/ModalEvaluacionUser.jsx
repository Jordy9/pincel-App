import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'
import { useSelector } from 'react-redux'

export const ModalEvaluacionUser = ({modalShowEvaluacion, setModalShowEvaluacion}) => {

    const { evaluacion } = useSelector(state => state.ev);

    // const evaluacionUser = evaluacion.filter(evaluacion => evaluacion.usuario === activeUser?.id)

    // const [completa, mejorar, calificacion] = evaluacionUser;

    const [rating, setRating] = useState(90) // initial rating value

    // Catch Rating value
    // const handleRating = (rate) => {
    //     setRating(rate)
    //     // other logic
    // }

    const handleClose = () => {
        setModalShowEvaluacion(false)
    }

    const handledButton = () => {
        document.getElementById('idButton').click()
    }

  return (
    <Modal fullscreen show={modalShowEvaluacion} onHide={handleClose}>
        <Modal.Header style={{border: 'none'}} closeButton>
          <Modal.Title><h1>Evaluación</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row my-3 p-4">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12" style={{borderRadius: '35px'}}>
                    <div className='table-responsive shadow p-4' style={{borderTopLeftRadius: '35px', borderBottomLeftRadius: '35px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: '500px'}}>
                        <h4 className='text-center'>Capacitaciones</h4>
                        <table className="table borderless">
                            <thead>
                                <tr>
                                    <th scope="col">Pregunta</th>
                                    <th scope="col">Respuesta seleccionada</th>
                                    <th scope="col">Respuesta correcta</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr onDoubleClick={() => setModalShowEvaluacion(true)}>
                                    <td>Servicio</td>
                                    <td>-</td>
                                    <td></td>
                                </tr>
                                <tr>    
                                    <td>Servicio</td>
                                    <td>-</td>
                                    <td></td>
                                </tr>
                                <tr>    
                                    <td>Servicio</td>
                                    <td>-</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </Modal.Body>
    </Modal>
  )
}
