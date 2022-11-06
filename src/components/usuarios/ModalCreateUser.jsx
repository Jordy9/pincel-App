import React from 'react'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import user from '../../heroes/user.webp'
import { CreateRole } from '../dashBoard/CreateRole'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { iniciarRegistro } from '../../store/auth/thunk'
import { useEffect } from 'react'
import { useResponsive } from '../../hooks/useResponsive'

export const ModalCreateUser = ({showModalCreateUser, setShowModalCreateUser}) => {

    const dispatch = useDispatch();

    const { upload } = useSelector(state => state.auth);

    const [ImagePerfil, setImagePerfil] = useState(null)

    const [ImagePerfilShow, setImagePerfilShow] = useState(null)

    const {handleSubmit, getFieldProps, touched, errors} = useFormik({
        initialValues: {
            name: '', 
            lastName: '', 
            email: '',
            date: '',
            role: '',
            urlImage: '',
            password: '',
            confirmPassword: ''
        },
        enableReinitialize: true,
        onSubmit: ({name, lastName, email, date, role, urlImage, password}) => {
            urlImage = ImagePerfil
            dispatch(iniciarRegistro(name, lastName, email.toLowerCase(), date, role, urlImage, password))
        },
        validationSchema: Yup.object({
            name: Yup.string()
                        .max(50, 'Debe de tener 50 caracteres o menos')
                        .min(2, 'Debe de tener 2 caracteres o más')
                        .required('Requerido'),
            lastName: Yup.string()
                        .max(50, 'Debe de tener 50 caracteres o menos')
                        .min(2, 'Debe de tener 2 caracteres o más')
                        .required('Requerido'),
            email: Yup.string()
                        .email('La dirección de email no es válida')
                        .required('Requerido'),
            password: Yup.string()
                        .required('Requerido'),
            confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password')], 'Las contraseñas deben ser iguales')
                        .required('Requerido')
        })
    })

    const handleClose = () => {
        setShowModalCreateUser(false)
        URL.revokeObjectURL(ImagePerfilShow)
    }

    const onClickImage = () => {
        document.getElementById('fileSelectorPerfilModal').click()
    }

    const [showRol, setShowRol] = useState(true)

    const onSubmitButton = () => {
        document.getElementById('idButtonSubmitCreate').click()
    }

    useEffect(() => {
      if (ImagePerfil) {
        setImagePerfilShow(URL.createObjectURL(ImagePerfil))
      }

      return () => URL.revokeObjectURL(ImagePerfilShow)

    }, [ImagePerfil])
    
    const [ respWidth ] = useResponsive()

    const [showPassword, setShowPassword] = useState(true)

  return (
    <Modal size='xl' show={showModalCreateUser} onHide={handleClose}>
        <Modal.Header style={{border: 'none'}} closeButton>
          <Modal.Title><h1>Crear usuario</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handleSubmit}>
                {
                    (showRol)
                        ?
                    <div className = 'row'>
                        <div className = 'col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4'>
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 d-flex justify-content-center align-items-center">
                                    <img src={ImagePerfilShow || user} style={{maxWidth: '250px', maxHeight: '250px', width: '250px', height: '250px', objectFit: 'cover', clipPath: 'circle()'}} alt="" />
                                </div>

                                <div className='d-grid gap-2 col-7 mx-auto mt-4'>
                                    {
                                        (upload !== 0)
                                            &&
                                        <div className="progress2 my-2">
                                            <div className="progress-bar" role="progressbar" style={{width: `${upload}%`, backgroundColor: 'rgb(89, 7, 211)', color: 'white', borderRadius: 100}} aria-valuemin="0" aria-valuemax="100">Subiendo foto de perfil {upload}%</div>
                                        </div>
                                    }
                                </div>

                                <div className='d-grid gap-2 col-6 mx-auto mt-4'>
                                    {
                                        (respWidth > 992)
                                            ?
                                        <button type='button' onClick={onClickImage} className='btn btn-primary form-control'>Foto de perfil</button>
                                            :
                                        <button type='button' onClick={onClickImage} className='btn btn-primary form-control'>Foto</button>
                                    }
                                    <input accept="image/*" id='fileSelectorPerfilModal' hidden = {true} type="file" className='form-control bg-transparent text-black' onChange={(e) => {
                                        setImagePerfil(e.currentTarget.files[0])
                                    }} />
                                </div>
                            </div>
                        </div>

                        <div className = 'col-xs-12 col-sm-12 col-md-6 col-lg-8 col-xl-8 col-xxl-8 d-flex align-items-center'>
                            <div className="row">
                                <div className = 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                                    <div className="form-group">
                                        <label>Nombre</label>
                                        <input {...getFieldProps('name')} type="text" placeholder='Juan' className='form-control' />
                                        {touched.name && errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
                                    </div>
                                </div>

                                <div className = 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                                    <div className="form-group">
                                        <label>Apellido</label>
                                        <input {...getFieldProps('lastName')} type="text" placeholder='Juan' className='form-control' />
                                        {touched.lastName && errors.lastName && <span style={{color: 'red'}}>{errors.lastName}</span>}
                                    </div>
                                </div>

                                <div className = 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'>
                                    <div className="form-group">
                                        <label>Correo</label>
                                        <input autoComplete='off' {...getFieldProps('email')} type="text" placeholder='ejemplo@gmail.com' className='form-control' />
                                        {touched.email && errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
                                    </div>
                                </div>

                                <div className = 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                                    <div className="form-group">
                                        <label>Fecha de nacimiento</label>
                                        <input {...getFieldProps('date')} type="date" placeholder='Juan' className='form-control' />
                                        {touched.date && errors.date && <span style={{color: 'red'}}>{errors.date}</span>}
                                    </div>
                                </div>

                                <div className = 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                                    <div className="form-group">
                                        <label>Rol</label>
                                        <select {...getFieldProps('role')} className='form-select'>
                                            <option value="">Seleccione un rol</option>
                                            <option value="Administrador">Administrador</option>
                                            <option value="Usuario">Usuario</option>
                                        </select>
                                        {touched.role && errors.role && <span style={{color: 'red'}}>{errors.role}</span>}
                                    </div>
                                </div>

                                <div className = 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                                    <div className="form-group">
                                        <label>Contraseña</label>
                                        <div className="input-group mb-3">
                                            <input autoComplete='off' {...getFieldProps('password')} type={(showPassword) ? 'password' : 'text'} placeholder = '********' className = 'form-control' aria-describedby="basic-addon2" />
                                            <span style={{cursor: 'pointer'}} onClick={() => setShowPassword(!showPassword)} className="input-group-text" id="basic-addon2"><i style={{color: 'rgb(0, 197, 0)'}} className={(showPassword) ? 'bi bi-eye-slash' : 'bi bi-eye'}></i></span>
                                        </div>
                                        {touched.password && errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
                                    </div>
                                </div>

                                <div className = 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
                                    <div className="form-group">
                                        <label>Confirmar contraseña</label>
                                        <input autoComplete='off' {...getFieldProps('confirmPassword')} type={(showPassword) ? 'password' : 'text'} placeholder='********' className='form-control' />
                                        {touched.confirmPassword && errors.confirmPassword && <span style={{color: 'red'}}>{errors.confirmPassword}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        :
                    <CreateRole />
                }
                <button hidden id='idButtonSubmitCreate'></button>
            </form>

        </Modal.Body>

        <Modal.Footer>
            <button type='submit' onClick={onSubmitButton} className='btn btn-primary'>Guardar</button>
            <button type='button' className='btn btn-danger'>Cancelar</button>
        </Modal.Footer>
    </Modal>
  )
}
