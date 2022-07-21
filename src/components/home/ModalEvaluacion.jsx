import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import user from '../../heroes/user.webp'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { Rating } from 'react-simple-star-rating'
import { ModalEvaluacionDescripcion } from './ModalEvaluacionDescripcion'

export const ModalEvaluacion = ({modalShow, setModalShow, first, activeUser}) => {

    const dispatch = useDispatch();

    const [rating, setRating] = useState(90)

        // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)
        // other logic
    }

    const {handleSubmit, getFieldProps, touched, errors} = useFormik({
        initialValues: {
            name: activeUser?.name ,
            lastName: activeUser?.lastName,
            date: activeUser?.date,
            email: activeUser?.email,
            role: activeUser?.role,
            password: activeUser?.password,
        },
        enableReinitialize: true,
        onSubmit: ({name, lastName, date, email, password, role}) => {
            // dispatch(iniciarActualizacion(activeUser?.id, name, lastName, date, email.toLowerCase(), password, role))
        },
        validationSchema: Yup.object({
        })
    })

    const handleClose = () => {
        setModalShow(false)
    }

    const [modalShowDescripcion, setModalShowDescripcion] = useState(false)

    const handledButton = () => {
        document.getElementById('idButton').click()
        setModalShowDescripcion(true)
    }

  return (
    <Modal fullscreen show={modalShow} onHide={handleClose}>
        <Modal.Header style={{border: 'none'}} closeButton>
          <Modal.Title><h1>Evaluando personal</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row p-4">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <form>
                        <div className="row">
                            {
                                first?.map(e => {
                                    return (
                                        <div className="col-col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-3">
                                            <div className='d-flex mx-auto' style={{width: '250px', height: '250px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                                <img src={activeUser?.urlImage || user} className='img-fluid' alt="" />
                                            </div>
                                            <h3 className='text-center my-2'>{activeUser?.name || 'Maria'} {activeUser?.lastName || 'Rodriguez'}</h3>
                                            <div className='text-center'>
                                                <Rating readonly ratingValue={rating} />
                                                <span style={{fontSize: '12px'}}>10 reseñas</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            {/* <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 shadow p-4 my-auto" style={{borderRadius: '35px'}}>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 form-group">
                                        <label className='d-flex justify-content-center'>Calificación en base al servicio que ofreció Maria</label>
                                        <div className='d-flex justify-content-center'>
                                            <Rating onChange = {handleRating} ratingValue={rating} />
                                        </div>
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 form-group">
                                        <label className='d-flex justify-content-center'>Descripción</label>
                                        <textarea type="text" cols={30} rows={10} {...getFieldProps('Descripcion')} style = {{resize: 'none'}} placeholder='Descripción de la Reseña' className='form-control' />
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <button type='button' id='idButton' hidden></button>
                    </form>
                </div>
            </div>

        </Modal.Body>
        <Modal.Footer onSubmit={handleSubmit}>
            <button type='button' onClick={handledButton} className='btn btn-primary'>
                Guardar
            </button>

            <button onClick={handleClose} className='btn btn-primary'>
                Cancelar
            </button>
        </Modal.Footer>

        <ModalEvaluacionDescripcion modalShowDescripcion = {modalShowDescripcion} setModalShowDescripcion = {setModalShowDescripcion} />
    </Modal>
  )
}
