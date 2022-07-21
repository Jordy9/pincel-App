import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import user from '../../heroes/user.webp'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { Rating } from 'react-simple-star-rating'

export const ModalEvaluacionDescripcion = ({modalShowDescripcion, setModalShowDescripcion, activeUser}) => {

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
        setModalShowDescripcion(false)
    }

    const handledButton = () => {
        document.getElementById('idButton').click()
    }

  return (
    <Modal fullscreen show={modalShowDescripcion} onHide={handleClose}>
        <Modal.Header style={{border: 'none'}} closeButton>
          <Modal.Title><h1>Evaluando personal</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row p-4">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <form>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 shadow p-4 my-auto" style={{borderRadius: '35px'}}>
                            <label className='d-flex justify-content-center'>Reseña general para el equipo</label>
                            <textarea type="text" cols={30} rows={10} {...getFieldProps('Descripcion')} style = {{resize: 'none'}} placeholder='Descripción de la Reseña' className='form-control' />
                        </div>
                        <button type='submit' id='idButton' hidden></button>
                    </form>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer onSubmit={handleSubmit}>
            <button type='submit' onClick={handledButton} className='btn btn-primary'>
                Guardar
            </button>

            <button onClick={handleClose} className='btn btn-primary'>
                Cancelar
            </button>
        </Modal.Footer>
    </Modal>
  )
}
