import React from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import { onDoubleTap } from '../../helper/onDoubleTap';
import { updateUsuarioIntento } from '../../store/capacitacion/thunk';

export const ModalEvaluacionUser = ({modalShowEvaluacion, setModalShowEvaluacion}) => {

    const dispatch = useDispatch();
    
    const { evaluacionActiva } = useSelector(state => state.ev);

    const { capacitacion } = useSelector(state => state.cp);

    const capacitacionFiltrada = capacitacion?.filter(capacitacion => capacitacion?._id === evaluacionActiva?.idCapacitacion)

    const intentos = capacitacionFiltrada[0]?.usuariosEvaluacion?.filter(usuarios => usuarios?.id === evaluacionActiva?.idUsuario)

    const handleClose = () => {
        setModalShowEvaluacion(false)
    }

    // const handledButton = () => {
    //     document.getElementById('idButton').click()
    // }

    const permitir = () => {
        Swal.fire({
            title: '¿Está seguro que desea resetear esta capacitación a este usuario?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'No por ahora',
            confirmButtonColor: 'rgb(0, 197, 0)',
            cancelButtonColor: 'rgb(0, 197, 0)',
            confirmButtonText: 'Si'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(updateUsuarioIntento(evaluacionActiva?.idCapacitacion, evaluacionActiva?.idUsuario, evaluacionActiva?._id, capacitacion))
                setModalShowEvaluacion(false)
            }
        })
    }

    const onShow = () => {
        setModalShowEvaluacion(true)
    }

  return (
    <Modal fullscreen show={modalShowEvaluacion} onHide={handleClose}>
        <Modal.Header style={{border: 'none'}} closeButton>
          <Modal.Title><h1>Evaluación</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row my-3">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12" style={{borderRadius: '35px'}}>
                    <div className='table-responsive shadow pt-4 pb-4 px-1' style={{borderTopLeftRadius: '35px', borderBottomLeftRadius: '35px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: '500px'}}>
                        <h4 className='text-center'>Questionario</h4>
                        <table className="table borderless">
                            <thead>
                                <tr>
                                    <th scope="col">Estado respuesta</th>
                                    <th scope="col">Pregunta</th>
                                    <th scope="col">Respuesta seleccionada</th>
                                    <th scope="col">Respuesta correcta</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   evaluacionActiva?.evaluacion?.map((evaluacion, index) => {
                                    return (
                                        <tr onTouchStart={(e) => onDoubleTap(e, onShow)} onDoubleClick={onShow}>
                                            {/* <td className='d-flex justify-content-start'>
                                                <button className='btn btn-primary'>{index + 1}</button>
                                            </td> */}
                                            <td>
                                                {
                                                    (evaluacion?.correcta === 'true')
                                                        ?
                                                    <i style={{fontSize: '25px'}} className="text-success bi bi-check-circle-fill"></i>
                                                        :
                                                    <i style={{fontSize: '25px'}} className="text-danger bi-x-circle-fill"></i>
                                                }
                                            </td>
                                            <td className='no-elipsis text-left'>{evaluacion?.evaluacion?.pregunta}</td>
                                            <td className='no-elipsis'>{evaluacion?.respuesta}</td>
                                            <td className='no-elipsis'>{evaluacion?.evaluacion?.respuesta[0]?.respuesta}</td>
                                        </tr>
                                    )
                                   }) 
                                }
                            </tbody>
                        </table>
                        <h5 className='text-right'>Calificación: {evaluacionActiva?.calificacion?.toFixed()}</h5>
                    </div>
                </div>
            </div>

        </Modal.Body>
        
        <Modal.Footer>
            <button hidden = {(intentos && intentos[0]?.intentos !== 0)} onClick={permitir} className='btn btn-primary'>Resetear capacitación a este usuario</button>
        </Modal.Footer>
    </Modal>
  )
}
