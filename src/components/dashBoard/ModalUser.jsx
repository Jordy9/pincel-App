import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'
import { useDispatch, useSelector } from 'react-redux'
import { modalClose } from '../../store/auth/authSlice'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import user from '../../heroes/user.webp'
import { iniciarActualizacion } from '../../store/auth/thunk'

export const ModalUser = () => {

    const dispatch = useDispatch();

    const { modalUser, activeUser } = useSelector(state => state.auth);

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
        dispatch(modalClose())
    }

    const handledButton = () => {
        document.getElementById('idButton').click()
    }

  return (
    <Modal fullscreen show={modalUser} onHide={handleClose}>
        <Modal.Header style={{border: 'none'}} closeButton>
          <Modal.Title><h1>Ver o actualizar usuario</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row p-4">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                                <div className='d-flex mx-auto' style={{width: '250px', height: '250px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                    <img src={activeUser?.urlImage || user} className='img-fluid' alt="" />
                                </div>
                                <h3 className='text-center my-2'>{activeUser?.name} {activeUser?.lastName}</h3>
                                <div className='text-center'>
                                    <Rating readonly ratingValue={rating} />
                                    <span style={{fontSize: '12px'}}>10 reseñas</span>
                                </div>
                            </div>


                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 shadow p-4 my-auto" style={{borderRadius: '35px'}}>
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
                                            <option value="Usuario">Usuario</option>
                                            <option value="Administrador">Administrador</option>
                                        </select>
                                        {touched.role && errors.role && <span style={{color: 'red'}}>{errors.role}</span>}
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                        <label>Capacitaciones realizadas</label>
                                        <input type="text" placeholder='10' className='form-control' />
                                        {/* {touched.name && errors.name && <span style={{color: 'red'}}>{errors.name}</span>} */}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                        <label>Capacitaciones por mejorar</label>
                                        <input type="text" placeholder='0' className='form-control' />
                                        {/* {touched.name && errors.name && <span style={{color: 'red'}}>{errors.name}</span>} */}
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                        <label>Promedio</label>
                                        <input type="text" placeholder='90' className='form-control' />
                                        {/* {touched.name && errors.name && <span style={{color: 'red'}}>{errors.name}</span>} */}
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                        <label>Indice</label>
                                        <input type="text" placeholder='4' className='form-control' />
                                        {/* {touched.name && errors.name && <span style={{color: 'red'}}>{errors.name}</span>} */}
                                    </div>
                                </div>

                                <div className="row d-flex justify-content-center">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected>Evaluaciones tomadas</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                        <button className='btn btn-primary form-control'>Permitir otro intento</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type='submit' id='idButton' hidden></button>
                    </form>
                </div>
            </div>

            <div className="row my-3 p-4">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12" style={{borderRadius: '35px'}}>
                    <div className="row">
                        <div className="col-2">
                            <h1 className='text-center'>Reseñas</h1>
                        </div>
                    </div>

                    <div className="row d-flex justify-content-center">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-3 shadow p-4 mx-2" style={{borderRadius: '35px', height: '240px'}}>
                            <div className='text-center'>
                                <Rating size={20} readonly ratingValue={rating} />
                            </div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero iusto dolore eligendi ab quam nobis aliquam quae possimus officia, error dolorem assumenda sed eius. Mollitia veniam reiciendis aperiam reprehenderit officia?
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5 shadow p-4 mx-2" style={{borderRadius: '35px', height: '240px'}}>
                            <div className='text-center'>
                                <Rating size={20} readonly ratingValue={rating} />
                            </div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero iusto dolore eligendi ab quam nobis aliquam quae possimus officia, error dolorem assumenda sed eius. Mollitia veniam reiciendis aperiam reprehenderit officia?
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-3 shadow p-4 mx-2" style={{borderRadius: '35px', height: '240px'}}>
                            <div className='text-center'>
                                <Rating size={20} readonly ratingValue={rating} />
                            </div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero iusto dolore eligendi ab quam nobis aliquam quae possimus officia, error dolorem assumenda sed eius. Mollitia veniam reiciendis aperiam reprehenderit officia?
                        </div>

                        {/* <div className="col-3 shadow p-4 mx-2" style={{borderRadius: '35px'}}>
                            <div className='text-center'>
                                <Rating size={20} readonly ratingValue={rating} />
                            </div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero iusto dolore eligendi ab quam nobis aliquam quae possimus officia, error dolorem assumenda sed eius. Mollitia veniam reiciendis aperiam reprehenderit officia?
                        </div> */}
                        
                        {/* <div className="col-3 shadow p-4 mx-2" style={{borderRadius: '35px'}}>
                            <div className='text-center'>
                                <Rating size={20} readonly ratingValue={rating} />
                            </div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero iusto dolore eligendi ab quam nobis aliquam quae possimus officia, error dolorem assumenda sed eius. Mollitia veniam reiciendis aperiam reprehenderit officia?
                        </div> */}
                    </div>

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
