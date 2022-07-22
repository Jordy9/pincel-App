import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'
import { useDispatch, useSelector } from 'react-redux'
import { modalClose } from '../../store/auth/authSlice'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import user from '../../heroes/user.webp'
import { iniciarActualizacion } from '../../store/auth/thunk'

export const ModalResenaDetalle = ({modalShowDetalle, setModalShowDetalle}) => {

    const dispatch = useDispatch();

    const { modalUser, activeUser } = useSelector(state => state.auth);

    const { evaluacion } = useSelector(state => state.ev);

    const evaluacionUser = evaluacion.filter(evaluacion => evaluacion.usuario === activeUser?.id)

    const [completa, mejorar, calificacion] = evaluacionUser;

    const [rating, setRating] = useState(90) // initial rating value

    // Catch Rating value
    // const handleRating = (rate) => {
    //     setRating(rate)
    //     // other logic
    // }

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
            dispatch(iniciarActualizacion(activeUser?.id, name, lastName, date, email.toLowerCase(), password, role))
        },
        validationSchema: Yup.object({
            name: Yup.string()
                        .max(50, 'Debe de tener 50 caracteres o menos')
                        .min(3, 'Debe de tener 3 caracteres o más')
                        .required('Requerido'),
            lastName: Yup.string()
                        .max(50, 'Debe de tener 50 caracteres o menos')
                        .min(3, 'Debe de tener 3 caracteres o más')
                        .required('Requerido'),
            date: Yup.string()
                        .required('Requerido'),
            email: Yup.string()
                        .email('La dirección de email no es válida')
                        .required('Requerido'),
            role: Yup.string()
                        .required('Requerido'),
        })
    })

    const handleClose = () => {
        setModalShowDetalle(false)
    }

    const handledButton = () => {
        document.getElementById('idButton').click()
    }

  return (
    <Modal fullscreen show={modalShowDetalle} onHide={handleClose}>
        <Modal.Header style={{border: 'none'}} closeButton>
          <Modal.Title><h1>Reseña</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row p-4">
                <form onSubmit={handleSubmit} className = "shadow p-4" style={{borderRadius: '35px'}}>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 my-2">
                        <h4 className='d-flex justify-content-center'>Calificación</h4>
                        <span className='d-flex justify-content-center'><Rating size={20} readonly ratingValue={rating} /></span>
                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 my-2">
                        <label className='d-flex justify-content-center'>Reseña general para el equipo</label>
                        <textarea type="text" cols={30} rows={10} {...getFieldProps('Descripcion')} style = {{resize: 'none'}} placeholder='Descripción de la Reseña' className='form-control' />
                    </div>
                    <button type='submit' id='idButton' hidden></button>
                </form>
            </div>

        </Modal.Body>
        <Modal.Footer onSubmit={handleSubmit}>
            <button type='submit' onClick={handledButton} className='btn btn-danger'>
                Eliminar definitivamente
            </button>
        </Modal.Footer>
    </Modal>
  )
}
