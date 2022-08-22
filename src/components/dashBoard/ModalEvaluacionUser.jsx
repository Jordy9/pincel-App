import React from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateUsuarioIntento } from '../../store/capacitacion/thunk';

export const ModalEvaluacionUser = ({modalShowEvaluacion, setModalShowEvaluacion}) => {

    const dispatch = useDispatch();
    
    const { evaluacionActiva } = useSelector(state => state.ev);

    const handleClose = () => {
        setModalShowEvaluacion(false)
    }

    // const handledButton = () => {
    //     document.getElementById('idButton').click()
    // }

    const permitir = () => {
        dispatch(updateUsuarioIntento(evaluacionActiva?.idCapacitacion, evaluacionActiva?.idUsuario))
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
                        <h4 className='text-center'>Questionario</h4>
                        <table className="table borderless">
                            <thead>
                                <tr>
                                    <th scope="col">Pregunta</th>
                                    <th scope="col">Respuesta seleccionada</th>
                                    <th scope="col">Respuesta correcta</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   evaluacionActiva?.evaluacion?.map(evaluacion => {
                                    return (
                                        <tr onDoubleClick={() => setModalShowEvaluacion(true)}>
                                            <td>{evaluacion?.evaluacion?.pregunta}</td>
                                            <td>{evaluacion?.respuesta}</td>
                                            <td>{evaluacion?.evaluacion?.respuesta1}</td>
                                            <td>
                                                {
                                                    (evaluacion?.correcta)
                                                    ?
                                                    <i style={{fontSize: '25px'}} className="text-success bi bi-check-circle-fill"></i>
                                                    :
                                                    <i style={{fontSize: '25px'}} className="text-danger bi bi-x-octagon"></i>
                                                }
                                            </td>
                                        </tr>
                                    )
                                   }) 
                                }
                            </tbody>
                        </table>
                        <h5 style = {{position: 'absolute', right: 50, bottom: 0}} >Calificación: {evaluacionActiva?.calificacion}</h5>
                    </div>
                </div>
            </div>

        </Modal.Body>
        
        <Modal.Footer>
            <button onClick={permitir} className='btn btn-primary'>Permitir otro intento</button>
        </Modal.Footer>
    </Modal>
  )
}
