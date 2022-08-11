import React, { useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Slider from 'react-slick';
import { crearEvaluacion } from '../../store/evaluacion/thunk';
import { CalificacionEvaluacion } from './CalificacionEvaluacion';

export const ModalEvaluacion = ({modalShowEvaluacion, setModalShowEvaluacion}) => {

    const dispatch = useDispatch();

    const { capacitacionActiva } = useSelector(state => state.cp);

    const { evaluacion } = useSelector(state => state.ev);

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

  const ref = useRef()

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    afterChange: (index) => {
        setChangeCountResponse(index + 1);},
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
    };

    const [changeEvaluacionCalificacion, setChangeEvaluacionCalificacion] = useState(false)

    const [calificacionShow, setcalificacionShow] = useState(0)

    const terminar = () => {
        const calificacion = formValues?.filter(calificacion => calificacion?.correcta === 'true')
        const calificacionFinal = (calificacion?.length / formValues?.length) * 100
        setcalificacionShow((calificacion?.length / formValues?.length) * 100)
        
        dispatch(crearEvaluacion(formValues, calificacionFinal))
        setChangeEvaluacionCalificacion(true)
    }

    const siguientePregunta = () => {
        if (changeCountResponse <= capacitacionActiva?.preguntas?.length) {
            ref?.current?.slickNext()
        }
    }

    const anteriorPregunta = () => {
        if (changeCountResponse > 1) {
            ref?.current?.slickPrev()
        }
    }

    const intentosPermitidos = capacitacionActiva?.usuariosEvaluacion?.filter(capacitacion => capacitacion?.id === uid)

  return (
    <Modal fullscreen show={modalShowEvaluacion} onHide={handleClose}>
        <Modal.Header style={{border: 'none'}} closeButton>
          <Modal.Title><h1>Evaluación</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row my-3 p-4">
                {
                    (!changeEvaluacionCalificacion && evaluacionUserComplete?.length === 0 && intentosPermitidos[0]?.intentos !== 0)
                        ?
                    <>
                        <h4>{changeCountResponse}/{capacitacionActiva?.preguntas?.length}</h4>
                        <Slider arrows = {false} ref={ref} {...settings}>
                            {
                                capacitacionActiva?.preguntas?.map((evaluacion, index) => {
                                    return (            
                                        <div className='p-4 text-black'>
                                            <h5>{evaluacion?.pregunta}</h5>
                                            <div className="row p-4 my-5">
                                                <div className="col-3">
                                                    <div className="form-check">
                                                        <input checked = {(formValues[index]?.respuesta === evaluacion?.respuesta1) && true} className="form-check-input" type="radio" onClick={() => funcionarreg(index, evaluacion, evaluacion?.respuesta1, evaluacion?.accion1 )} id="exampleRadios2" value={formValues[index]?.respuesta} />
                                                        <label className="form-check-label">{evaluacion?.respuesta1}</label>
                                                    </div>
                                                </div>

                                                <div className="col-3">
                                                    <div className="form-check">
                                                        <input checked = {(formValues[index]?.respuesta === evaluacion?.respuesta2) && true} className="form-check-input" type="radio" onClick={() => funcionarreg(index, evaluacion, evaluacion?.respuesta2, evaluacion?.accion2 )} id="exampleRadios2" value="option2" />
                                                        <label className="form-check-label">{evaluacion?.respuesta2}</label>
                                                    </div>
                                                </div>

                                                <div className="col-3">
                                                    <div className="form-check">
                                                        <input checked = {(formValues[index]?.respuesta === evaluacion?.respuesta3) && true} className="form-check-input" type="radio" onClick={() => funcionarreg(index, evaluacion, evaluacion?.respuesta3, evaluacion?.accion3 )} id="exampleRadios2" value="option2" />
                                                        <label className="form-check-label">{evaluacion?.respuesta3}</label>
                                                    </div>
                                                </div>

                                                <div className="col-3">
                                                    <div className="form-check">
                                                        <input checked = {(formValues[index]?.respuesta === evaluacion?.respuesta4) && true} className="form-check-input" type="radio" onClick={() => funcionarreg(index, evaluacion, evaluacion?.respuesta4, evaluacion?.accion4 )} id="exampleRadios2" value="option2"/>
                                                        <label className="form-check-label">{evaluacion?.respuesta4}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </>
                        :
                    <CalificacionEvaluacion calificacionShow = {calificacionShow || evaluacionUserComplete[0]?.calificacion} />
                }
            </div>
        </Modal.Body>

        <Modal.Footer>

            {
                (changeCountResponse > 1)
                    &&
                <button onClick={anteriorPregunta} className='btn btn-primary'>Anterior</button>
            }

            {
                (changeCountResponse === capacitacionActiva?.preguntas?.length)
                    ?
                (evaluacionUserComplete?.length === 0 && intentosPermitidos[0]?.intentos !== 0)
                    &&
                <button onClick={terminar} className='btn btn-primary'>Terminar</button>
                    :
                <button onClick={siguientePregunta} className='btn btn-primary'>Siguiente</button>
            }
        </Modal.Footer>
    </Modal>
  )
}
