import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { iniciarActualizacionPass } from '../../store/auth/thunk'

export const ModalCambPass = ({showModal, setShowModal}) => {

    const dispatch = useDispatch();

    const { usuarioActivo } = useSelector(state => state.auth);

    const {handleSubmit, getFieldProps, touched, errors} = useFormik({
        initialValues: {
            passwordActual: '',
            password: '',
            confirmPassword: ''
        },
        enableReinitialize: true,
        onSubmit: ({passwordActual, password}) => {
            dispatch(iniciarActualizacionPass(usuarioActivo?.id, usuarioActivo?.name, usuarioActivo?.lastName, usuarioActivo?.date, usuarioActivo?.email.toLowerCase(), passwordActual, password, usuarioActivo?.role, usuarioActivo?.team, usuarioActivo?.urlImage))
        },
        validationSchema: Yup.object({
            passwordActual: Yup.string()
                        .required('Requerido'),
            password: Yup.string()
                        .required('Requerido'),
            confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password')], 'Las contraseñas deben ser iguales')
                        .required('Requerido'),
        })
    })

    const handleClose = () => {
        setShowModal(false)
    }

    const handledButton = () => {
        document.getElementById('idButton').click()
    }

    const [showPassword, setShowPassword] = useState(true)

  return (
    <Modal size='md' show={showModal} onHide={handleClose}>
        <Modal.Header style={{border: 'none'}} closeButton>
          <Modal.Title><h1>Cambiar contraseña</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handleSubmit}>
                <label>Contraseña</label>
                <div className="input-group mb-3">
                    <input autoComplete='off' {...getFieldProps('passwordActual')} type={(showPassword) ? 'password' : 'text'} placeholder = '********' className = 'form-control' aria-describedby="basic-addon2" />
                    <span style={{cursor: 'pointer'}} onClick={() => setShowPassword(!showPassword)} className="input-group-text" id="basic-addon2"><i style={{color: 'rgb(0, 197, 0)'}} className={(showPassword) ? 'bi bi-eye-slash' : 'bi bi-eye'}></i></span>
                </div>
                <input autoComplete='off' type={(showPassword) ? 'password' : 'text'} {...getFieldProps('password')} placeholder = 'Contraseña nueva' className = 'form-control bg-transparent text-black my-2' />
                {touched.password && errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
                <input autoComplete='off' type={(showPassword) ? 'password' : 'text'} {...getFieldProps('confirmPassword')} placeholder = 'Escribe de nuevo la nueva contraseña' className = 'form-control bg-transparent text-black my-2' />
                {touched.confirmPassword && errors.confirmPassword && <span style={{color: 'red'}}>{errors.confirmPassword}</span>}
                <button type='submit' id='idButton' hidden></button>
            </form>
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
