import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'
import { useDispatch, useSelector } from 'react-redux'
import { modalClose } from '../../store/auth/authSlice'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import user from '../../heroes/user.webp'
import { iniciarActualizacion } from '../../store/auth/thunk'

export const ModalPerfilUser = ({modalShow, setModalShow}) => {

    const dispatch = useDispatch();

    const { modalUser, activeUser } = useSelector(state => state.auth);

    // const { evaluacion } = useSelector(state => state.ev);

    // const evaluacionUser = evaluacion.filter(evaluacion => evaluacion.usuario === activeUser?.id)

    // const [completa, mejorar, calificacion] = evaluacionUser;

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
        setModalShow(false)
    }

    const handledButton = () => {
        document.getElementById('idButton').click()
    }

  return (
    <Modal fullscreen show={modalShow} onHide={handleClose}>
        <Modal.Header style={{border: 'none'}} closeButton>
          <Modal.Title><h1>Ver o actualizar usuario</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row p-4">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <form onSubmit={handleSubmit}>
                        <div className="row">

                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 shadow p-4 my-auto" style={{borderRadius: '35px'}}>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                        <label>Nombre</label>
                                        <input type="text" {...getFieldProps('name')} placeholder='Nombre' className='form-control' />
                                        {touched.name && errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                        <label>Apellido</label>
                                        <input type="text" {...getFieldProps('lastName')} placeholder='Apellido' className='form-control' />
                                        {touched.lastName && errors.lastName && <span style={{color: 'red'}}>{errors.lastName}</span>}
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                        <label>Correo electrónico</label>
                                        <input type="text" {...getFieldProps('email')} placeholder='Correo electrónico' className='form-control' />
                                        {touched.email && errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                        <label>Fecha de nacimiento</label>
                                        <input type="date" {...getFieldProps('date')} placeholder='Fecha de nacimiento' className='form-control' />
                                        {touched.date && errors.date && <span style={{color: 'red'}}>{errors.date}</span>}
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                        <label>Rol del usuario</label>
                                        <select className="form-select" {...getFieldProps('role')} aria-label="Default select example">
                                            <option selected>Seleccione una opción</option>
                                            <option value="Servicio">Equipo de Servicio</option>
                                            <option value="Shamponier">Equipo de Shamponier</option>
                                            <option value="Unas">Equipo de Uñas</option>
                                            <option value="Estilista">Equipo de Estilistas</option>
                                            <option value="Administrador">Administrador</option>
                                        </select>
                                        {touched.role && errors.role && <span style={{color: 'red'}}>{errors.role}</span>}
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                        <label>Capacitaciones realizadas</label>
                                        <input type="text" readOnly value={0} placeholder='10' className='form-control' />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                        <label>Capacitaciones por mejorar</label>
                                        <input type="text" readOnly value={0} placeholder='0' className='form-control' />
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                        <label>Promedio</label>
                                        <input type="text" readOnly value={0} placeholder='90' className='form-control' />
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                        <label>Indice</label>
                                        <input type="text" readOnly value={0} placeholder='4' className='form-control' />
                                    </div>
                                </div>
                            </div>
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

            <button onClick={handleClose} className='btn btn-danger'>
                Desactivar usuario
            </button>
        </Modal.Footer>
    </Modal>
  )
}
