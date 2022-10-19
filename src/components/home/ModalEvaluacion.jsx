import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { Rating } from 'react-simple-star-rating'
import Slider from "react-slick";
import { setClearResena } from '../../store/resena/resenaSlice';
import { ModalEvaluacionFront } from './EvaluacionFront'
import user from '../../heroes/user.webp'

export const ModalEvaluacion = ({modalShow, setModalShow, resena, activeUser}) => {

  const dispatch = useDispatch();

    const [rating, setRating] = useState(0)

    const [idUsuarios, setIdUsuarios] = useState([])

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

    const handleClose = () => {
        setModalShow(false)
        setIdUsuarios([])
        dispatch(setClearResena())
    }

    // const [modalShowFront, setModalShowFront] = useState(false)

    const settings = {
        dots: false,
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
              initialSlide: 0,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 0,
              dots: false
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 0,
              dots: false
            }
          }
        ]
      };

      const [next, setNext] = useState(false)

      const [ShowModalFront, setShowModalFront] = useState(false)

      useEffect(() => {
        if (idUsuarios?.length === resena?.length) {
          setNext(true)
          setShowModalFront(true)
        }
      }, [idUsuarios, resena?.length])

      const trueFalse = resena.filter(resena => resena.role === 'Administrador')

      const handledButton = () => {
        document.getElementById('idButton').click()
        setShowModalFront(true)
    }

    const ref = useRef()

    useEffect(() => {
      if (ref?.current && idUsuarios?.length !== 0) {
        ref?.current?.slickNext()
      }
    }, [idUsuarios])

    useEffect(() => {
      if (resena?.length === 0) {
        setModalShow(false)
      }
    }, [resena, setModalShow])

    const [segundos, setSegundos] = useState(0)
    const refSegundos = useRef()

    useEffect(() => {
      refSegundos.current && clearInterval(refSegundos.current)
      refSegundos.current = setInterval(
         () => (!next) && setSegundos(s => s + 1)
        , 1000)
    }, [next])

    useEffect(() => {
      setSegundos(0)
    }, [idUsuarios])

    useEffect(() => {
      if (segundos === 25) {
        setIdUsuarios([])
        dispatch(setClearResena())
      }
    }, [segundos])
    
  return (
    <Modal fullscreen show={modalShow} onHide={handleClose}>
        <Modal.Header className={`${(trueFalse?.length !== 0) && 'mt-3'}`} style={{border: 'none'}} closeButton>
          {/* <Modal.Title><h1>Evaluando personal</h1></Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
            <div className="row p-4">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <div className="row">
                        <Slider ref={ref} {...settings}>
                            {
                                resena?.filter(usuario => usuario?.toResena === 'Activos')?.map(usuario => {
                                    return (
                                        <div key={usuario?.id} className="col-col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 my-4">
                                            <h1 className='text-center my-2 mb-5'>¿Cómo fue el servicio de <strong>{usuario?.name}</strong> hoy?</h1>
                                            <div className='d-flex justify-content-center mx-auto' style={{width: '300px', height: 'auto', borderRadius: '10px', overflow: 'hidden', objectFit: 'cover'}}>
                                                <img src={usuario?.urlImage || user} className='img-fluid' style={{cursor: 'pointer', borderRadius: '20px'}} alt="" />
                                            </div>
                                            <div className='text-center mt-3'>
                                                <Rating allowHover transition emptyColor='#828282' size={50} onClick={(rate) => handleRating([rate, usuario.id])} ratingValue={(usuario?.id === idUsuarios[1]) && idUsuarios[0]} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>

                    <button type='button' id='idButton' hidden></button>
                </div>
            </div>

            {
                (next)
                    &&
                <ModalEvaluacionFront 
                  resena = {resena} 
                  idUsuarios = {idUsuarios} 
                  setIdUsuarios = {setIdUsuarios} 
                  ShowModalFront = {ShowModalFront} 
                  setShowModalFront = {setShowModalFront} 
                />
            }
            

        </Modal.Body>
        <Modal.Footer>
            <button disabled = {(!next)} hidden = {!next} type='button' onClick={handledButton} className='btn btn-primary'>
                Siguiente
            </button>
        </Modal.Footer>
    </Modal>
  )
}
