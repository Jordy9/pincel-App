import React, { useMemo, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { actualizarEvaluacion, crearEvaluacion } from '../../store/evaluacion/thunk';
import { CalificacionEvaluacion } from './CalificacionEvaluacion';

export const ModalEvaluacion = ({modalShowEvaluacion, setModalShowEvaluacion}) => {

    const dispatch = useDispatch();

    const { capacitacionActiva } = useSelector(state => state.cp);

    const { evaluacion } = useSelector(state => state.ev);

    const updtEvaluacion = evaluacion?.filter(evaluacion => evaluacion?.idCapacitacion === capacitacionActiva?._id)

    const { uid } = useSelector(state => state.auth);

    const evaluacionUserComplete = evaluacion?.filter(evaluacion => evaluacion?.idCapacitacion === window.location.pathname.split('/')[2] && evaluacion?.idUsuario === uid)

  const handleClose = () => {
    setModalShowEvaluacion(false)
  }

  const [formValues, setFormValues] = useState([{evaluacion: null, respuesta: '', correcta: ''}])

  const funcionarreg = (i, evaluacion, a, e) => {
    let newArre = [...formValues]
    newArre[i] = {evaluacion, respuesta: a, correcta: e}
    setFormValues(newArre)
}

  const [changeCountResponse, setChangeCountResponse] = useState(1)

    const intentosPermitidos = capacitacionActiva?.usuariosEvaluacion?.filter(capacitacion => capacitacion?.id === uid)

    const [changeEvaluacionCalificacion, setChangeEvaluacionCalificacion] = useState((evaluacionUserComplete?.length === 0 && Number(Number(intentosPermitidos[0]?.intentos)) !== 0) ? false : true)

    const [calificacionShow, setcalificacionShow] = useState(0)

    const terminar = () => {
        const calificacion = formValues?.filter(calificacion => calificacion?.correcta === 'true')
        const calificacionFinal = (calificacion?.length / formValues?.length) * 100
        setcalificacionShow((calificacion?.length / formValues?.length) * 100)

        if (capacitacionActiva?.intentos === Number(intentosPermitidos[0]?.intentos) && updtEvaluacion?.length === 0) {
            dispatch(crearEvaluacion(formValues, calificacionFinal))
        } else {
            dispatch(actualizarEvaluacion(formValues, calificacionFinal, evaluacionUserComplete[0]?._id))
        }
        
        setChangeEvaluacionCalificacion(true)
    }

    const siguientePregunta = () => {
        if (changeCountResponse <= capacitacionActiva?.preguntas?.length) {
            setChangeCountResponse(changeCountResponse + 1)
        }
    }

    const anteriorPregunta = () => {
        if (changeCountResponse > 1) {
            setChangeCountResponse(changeCountResponse - 1)
        }
    }

    const seleccionados = formValues?.filter(form => form?.evaluacion !== null)

    // let PreguntaAleatoria = useMemo(() => capacitacionActiva?.preguntas?.map(pregunta => pregunta).sort(() => Math.random() - 0.5), [])

    let PreguntaAleatoria = capacitacionActiva?.preguntas

    let arregloRespuestasAleatorias = useMemo(() => PreguntaAleatoria[changeCountResponse - 1].respuesta?.map(respuesta => respuesta)?.sort(() => Math.random() - 0.5), [changeCountResponse - 1])

  return (
    <Modal fullscreen show={modalShowEvaluacion} onHide={handleClose}>
        <Modal.Header style={{border: 'none'}} closeButton>
          <Modal.Title><h1>Evaluación</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row my-3 p-4">
                {
                    (!changeEvaluacionCalificacion)
                        ?
                    <>
                        <h4>{changeCountResponse}/{capacitacionActiva?.preguntas?.length}</h4>

                        <div className='p-4 text-black'>
                            <h5>{PreguntaAleatoria[changeCountResponse - 1]?.pregunta}</h5>
                            <div className="row p-4 my-5">
                                {
                                    arregloRespuestasAleatorias?.map((evaluacionResp, index) => {
                                        return (
                                            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 my-3 d-flex justify-content-center" style={{maxHeight: '150px'}}>
                                                <div className="form-check">
                                                    <input checked = {(formValues[changeCountResponse - 1]?.respuesta === evaluacionResp?.respuesta) && true} className="form-check-input" type="radio" onClick={() => funcionarreg(changeCountResponse - 1, capacitacionActiva?.preguntas[changeCountResponse - 1], evaluacionResp?.respuesta, evaluacionResp?.accion )} id="exampleRadios2" value="option2" />
                                                    <label className="form-check-label">{evaluacionResp?.respuesta}</label>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </>
                        :
                    <CalificacionEvaluacion 
                        intentos = {Number(intentosPermitidos[0]?.intentos)} 
                        calificacionShow = {calificacionShow || evaluacionUserComplete[0]?.calificacion} 
                        setChangeCountResponse = {setChangeCountResponse} 
                        setChangeEvaluacionCalificacion = {setChangeEvaluacionCalificacion}
                        evaluacionActiva = {evaluacionUserComplete[0]?.evaluacion}
                        setFormValues = {setFormValues}
                    />
                }
            </div>
        </Modal.Body>

        <Modal.Footer>

            {
                (changeCountResponse > 1 && !changeEvaluacionCalificacion)
                    &&
                <button onClick={anteriorPregunta} className='btn btn-primary'>Anterior</button>
            }

            {
                ((changeCountResponse === capacitacionActiva?.preguntas?.length && formValues?.length === changeCountResponse) || Number(intentosPermitidos[0]?.intentos) === 0)
                    ?
                (Number(Number(intentosPermitidos[0]?.intentos)) !== 0 && seleccionados?.length !== 0 && !changeEvaluacionCalificacion)
                    &&
                <button onClick={terminar} className='btn btn-primary'>Terminar</button>
                    :
                <button hidden = {(changeEvaluacionCalificacion || changeCountResponse === capacitacionActiva?.preguntas?.length)} onClick={siguientePregunta} className='btn btn-primary'>Siguiente</button>
            }
        </Modal.Footer>
    </Modal>
  )
}
