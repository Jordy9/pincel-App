import React, { useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Slider from 'react-slick';

export const ModalEvaluacion = ({modalShowEvaluacion, setModalShowEvaluacion}) => {

    const { capacitacionActiva } = useSelector(state => state.cp);

  const handleClose = () => {
    setModalShowEvaluacion(false)
  }

  let arre = []

  const funcionarreg = (evaluacion, respuesta) => {
    arre.push(...arre, {evaluacion, respuesta})

    console.log(arre)
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

    const terminar = () => {

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

  return (
    <Modal fullscreen show={modalShowEvaluacion} onHide={handleClose}>
        <Modal.Header style={{border: 'none'}} closeButton>
          <Modal.Title><h1>Evaluación</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row my-3 p-4">
                <h4>{changeCountResponse}/{capacitacionActiva?.preguntas?.length}</h4>
                <Slider arrows = {false} ref={ref} {...settings}>
                    {
                        capacitacionActiva?.preguntas?.map(evaluacion => {
                            return (            
                                <div className='p-4 text-black'>
                                    <h5>{evaluacion?.pregunta}</h5>
                                    <div className="row p-4 my-5">
                                        <div className="col-3">
                                            <div className="form-check">
                                                <input onClick={() => funcionarreg(evaluacion, evaluacion?.accion1)} type="radio" className="form-check-input" id="exampleCheck1" />
                                                <label className="form-check-label">{evaluacion?.respuesta1}</label>
                                            </div>
                                        </div>

                                        <div className="col-3">
                                            <div className="form-check">
                                                <input onClick={() => funcionarreg(evaluacion, evaluacion?.accion2)} type="radio" className="form-check-input" id="exampleCheck1" />
                                                <label className="form-check-label">{evaluacion?.respuesta2}</label>
                                            </div>
                                        </div>

                                        <div className="col-3">
                                            <div className="form-check">
                                                <input onClick={() => funcionarreg(evaluacion, evaluacion?.accion3)} type="radio" className="form-check-input" id="exampleCheck1" />
                                                <label className="form-check-label">{evaluacion?.respuesta3}</label>
                                            </div>
                                        </div>

                                        <div className="col-3">
                                            <div className="form-check">
                                                <input onClick={() => funcionarreg(evaluacion, evaluacion?.accion4)} type="radio" className="form-check-input" id="exampleCheck1" />
                                                <label className="form-check-label">{evaluacion?.respuesta4}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>
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
                <button onClick={terminar} className='btn btn-primary'>Terminar</button>
                    :
                <button onClick={siguientePregunta} className='btn btn-primary'>Siguiente</button>
            }
        </Modal.Footer>
    </Modal>
  )
}
