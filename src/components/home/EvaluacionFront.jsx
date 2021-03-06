import React, { useEffect, useState } from 'react'
import user from '../../heroes/user.webp'
import { Rating } from 'react-simple-star-rating'
import { ModalEvaluacionDescripcion } from './ModalEvaluacionDescripcion'
import { useDispatch, useSelector } from 'react-redux'
import { crearAResena } from '../../store/resena/thunk'
import Slider from "react-slick";
import { Modal } from 'react-bootstrap'


export const ModalEvaluacionFront = ({resena, idUsuarios, setIdUsuarios, ShowModalFront, setShowModalFront}) => {

    const dispatch = useDispatch();

    const [rating, setRating] = useState(90)

        // Catch Rating value
    const handleRating = (rate) => {
        const condicion = idUsuarios?.filter(id => id?.id === rate[1])
        if (condicion?.length !== 0) {
            setIdUsuarios(idUsuarios?.map(id => id?.id === rate[1] ? {id: rate[1], calificacion: rate[0]} : id))
        } else {
            setIdUsuarios([...idUsuarios, {id: rate[1], calificacion: rate[0]}])
        }
        setRating(rate[0])
        // other logic
    }

    const [modalShowDescripcion, setModalShowDescripcion] = useState(false)

    const { usuarios } = useSelector(state => state.auth);

    const handledButton = () => {
        document.getElementById('idButton').click()
        setModalShowDescripcion(true)
    }

    const trueFalse = resena.filter(resena => resena.role === 'Administrador')

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: false,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1,
              dots: true
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true
            }
          }
        ]
      };

      const [evaluateFront, setEvaluateFront] = useState(true)

      const handleClose = () => {
        setShowModalFront(false)
        setTimeout(() => {
            setEvaluateFront(true)
        }, 500);
      }

      const [next, setNext] = useState(false)

      const resenaToDesc = resena?.filter(resena => resena?.role === 'Administrador')
    useEffect(() => {

        if (resenaToDesc?.length !== 0) {
            if (idUsuarios?.length === resena?.length) {
                setNext(true)
                setModalShowDescripcion(true)
            }
        }

    }, [idUsuarios])

  return (
    <Modal fullscreen show={ShowModalFront} onHide={handleClose}>
        <Modal.Header className={`${(trueFalse?.length !== 0) && 'mt-3'}`} style={{border: 'none'}} closeButton>
          <Modal.Title><h1>Evaluando personal de despacho</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <div className="row p-4">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <h3 hidden = {(evaluateFront === false)} className='text-center my-2'>??Qui??n te atendi?? hoy en el despacho?</h3>
                    <form>
                        <div className="row">
                            {
                                (evaluateFront)
                                    ?
                                usuarios?.filter(usuarios => usuarios?.role === 'Administrador')?.map(usuario => {
                                    return (
                                        <div hidden = {false} onClick={() => dispatch(crearAResena(usuario))} className="col-col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-3 my-4">
                                            <div className='d-flex mx-auto' style={{width: '300px', height: 'auto', borderRadius: '10px', overflow: 'hidden', objectFit: 'cover'}}>
                                                {
                                                    (resena?.includes(usuario))
                                                        &&
                                                    <i style={{fontSize: '35px', position: 'absolute', zIndex: 1045, top: 5, right: 37}} className="text-primary bi bi-check-circle-fill"></i>
                                                }
                                                <img src={'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg'} className='img-fluid' style={{cursor: 'pointer', borderRadius: '20px', opacity: (resena?.includes(usuario)) && 0.8}} alt="" />
                                            </div>
                                            <h3 className='text-center my-2'>{usuario?.name} {usuario?.lastName}</h3>
                                        </div>
                                    )
                                })
                                    :
                                <Slider {...settings}>
                                    {
                                        resena?.filter(usuarios => usuarios?.role === 'Administrador')?.map(usuario => {
                                            return (
                                                <div className="col-col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 my-4">
                                                    <h3 className='text-center my-2'>??C??mo fue el servicio de {usuario?.name} {usuario?.lastName} el d??a de hoy?</h3>
                                                    <div className='d-flex mx-auto' style={{width: '300px', height: '300px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                                        <img src={'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg'} className='img-fluid' alt="" />
                                                    </div>
                                                    <div className='text-center mt-3'>
                                                        <Rating onClick={(rate) => handleRating([rate, usuario.id])} ratingValue={(usuario?.id === idUsuarios[1]) && idUsuarios[0]} />
                                                        <span style={{fontSize: '12px'}}></span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                            }
                            
                        </div>
                        <button onClick={handledButton} type='button' id='idButton' hidden></button>
                    </form>
                    <div className='d-flex justify-content-center'>
                        <button hidden = {(trueFalse?.length === 0 || !evaluateFront)} onClick={() => setEvaluateFront(false)} className='btn btn-primary form-control' style={{position: 'fixed', zIndex: 1045, top: 0}}>Evaluar</button>
                    </div>
                </div>
                {
                    (next)
                        &&
                    <ModalEvaluacionDescripcion modalShowDescripcion = {modalShowDescripcion} setModalShowDescripcion = {setModalShowDescripcion} idUsuarios = {idUsuarios} />
                }
            </div>
        </Modal.Body>
        <Modal.Footer>
            <button disabled = {(!next)} type='button' onClick={handledButton} className='btn btn-primary'>
                Siguiente
            </button>
        </Modal.Footer>
    </Modal>
  )
}
