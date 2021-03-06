import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import user from '../../heroes/user.webp'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { Rating } from 'react-simple-star-rating'
import { ModalEvaluacionDescripcion } from './ModalEvaluacionDescripcion'
import Slider from "react-slick";
import { ModalEvaluacionFront } from './EvaluacionFront'

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

    const {handleSubmit, getFieldProps, touched, errors} = useFormik({
        initialValues: {
            // calificacion:,
            // descripcion:
        },
        enableReinitialize: true,
        onSubmit: ({}) => {
            dispatch()
        },
        validationSchema: Yup.object({
        })
    })

    const handleClose = () => {
        setModalShow(false)
    }

    // const [modalShowFront, setModalShowFront] = useState(false)

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

      const [next, setNext] = useState(false)

      const [ShowModalFront, setShowModalFront] = useState(false)

      useEffect(() => {
        if (idUsuarios?.length === resena?.length) {
            setNext(true)
            setShowModalFront(true)
        }
      }, [idUsuarios])

      const trueFalse = resena.filter(resena => resena.role === 'Administrador')

      const handledButton = () => {
        document.getElementById('idButton').click()
        setShowModalFront(true)
    }

  return (
    <Modal fullscreen show={modalShow} onHide={handleClose}>
        <Modal.Header className={`${(trueFalse?.length !== 0) && 'mt-3'}`} style={{border: 'none'}} closeButton>
          <Modal.Title><h1>Evaluando personal</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row p-4">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <div className="row">
                        <Slider {...settings}>
                            {
                                resena?.filter(usuario => usuario?.role !== 'Administrador')?.map(usuario => {
                                    return (
                                        <div className="col-col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 my-4">
                                            <h3 className='text-center my-2'>??C??mo fue el servicio de {usuario?.name} {usuario?.lastName} el d??a de hoy?</h3>
                                            <div className='d-flex mx-auto' style={{width: '300px', height: 'auto', borderRadius: '10px', overflow: 'hidden', objectFit: 'cover'}}>
                                                <img src={'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg'} className='img-fluid' style={{cursor: 'pointer', borderRadius: '20px'}} alt="" />
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
                    </div>

                    <button type='button' id='idButton' hidden></button>
                </div>
            </div>

            {
                (next)
                    &&
                <ModalEvaluacionFront resena = {resena} idUsuarios = {idUsuarios} setIdUsuarios = {setIdUsuarios} ShowModalFront = {ShowModalFront} setShowModalFront = {setShowModalFront} />
            }
            

        </Modal.Body>
        <Modal.Footer onSubmit={handleSubmit}>
            <button disabled = {(!next)} type='button' onClick={handledButton} className='btn btn-primary'>
                Siguiente
            </button>
        </Modal.Footer>
    </Modal>
  )
}
