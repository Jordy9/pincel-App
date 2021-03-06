import React, { useState } from 'react'
import { Sidebar } from '../Sidebar'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { iniciarActualizacion } from '../../store/auth/thunk'
import { ModalCambPass } from './ModalCambPass'

export const Perfil = () => {

    const dispatch = useDispatch();

    const { usuarioActivo } = useSelector(state => state.auth);

    const {handleSubmit, getFieldProps, touched, errors} = useFormik({
        initialValues: {
            name: usuarioActivo?.name ,
            lastName: usuarioActivo?.lastName,
            date: usuarioActivo?.date,
            email: usuarioActivo?.email,
            role: usuarioActivo?.role,
            password: usuarioActivo?.password,
            confirmPassword: usuarioActivo?.password
        },
        enableReinitialize: true,
        onSubmit: ({name, lastName, date, email, password, role}) => {
            dispatch(iniciarActualizacion(usuarioActivo?.id, name, lastName, date, email.toLowerCase(), password, role))
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
            password: Yup.string()
                        .min(8, 'Debe de tener 8 caracteres o más')
                        .matches(/(?=.*[A-Z])/, "Debe contener como mínimo una letra mayúscula")
                        .matches(/(?=.*[0-9])/, "Debe contener como mínimo un número")
                        .required('Requerido'),
            confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password')], 'Las contraseñas deben ser iguales')
                        .required('Requerido')
        })
    })

    const onClickImage = () => {
        document.getElementById('fileSelector').click()
    }

    const [showModal, setShowModal] = useState(false)

    const modalOpen = () => {
        setShowModal(true)
    }

  return (
    <Sidebar>
        <div className="row">
            <div className="col-12">
                <div className = 'p-4 flex-column text-black'>
                    <h1 className="text-black">Información personal</h1>
                    <form className='my-5' onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 form-group">
                                <label>Nombre</label>
                                <input type="text" {...getFieldProps('name')} placeholder = 'Juan' className = 'form-control bg-transparent text-black' />
                                {touched.name && errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 form-group">
                                <label>Apellido</label>
                                <input type="text" {...getFieldProps('lastName')} placeholder = 'Taveras' className = 'form-control bg-transparent text-black' />
                                {touched.lastName && errors.lastName && <span style={{color: 'red'}}>{errors.lastName}</span>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                <label>Correo Electrónico</label>
                                <input type="text" {...getFieldProps('email')} placeholder = 'Ejemplo@hotmail.com' className = 'form-control bg-transparent text-black ' />
                                {touched.email && errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                <label>Imagen</label>
                                <button type='button' onClick={onClickImage} className='btn btn-primary form-control'>Seleccionar foto de perfil <i className="bi bi-images btn-primary mx-1"></i></button>
                                <input accept="image/*" id='fileSelector' hidden = {true} type="file" className='form-control bg-transparent text-black' name='image' />
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                <label>Cambiar contraseña</label>
                                <button onClick={modalOpen} type='button' className = 'btn btn-primary form-control'>Cambiar contraseña</button>
                            </div>

                        </div>
                        
                        <div className='d-grid gap-2 col-6 mx-auto'>
                            <button type='submit' className = 'btn btn-primary  my-2'>Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <ModalCambPass showModal = {showModal} setShowModal = {setShowModal} />
    </Sidebar>
  )
}
