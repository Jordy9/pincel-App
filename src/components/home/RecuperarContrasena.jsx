import React from 'react'
import { useDispatch } from 'react-redux'
import gse from '../../heroes/gse.png'
import { replace, useFormik } from 'formik'
import * as Yup from 'yup'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userMessageToRedirect } from '../../helper/userMessageToRedirect'
import { recuperarPass } from '../../store/auth/thunk'

export const RecuperarContrasena = () => {

    const dispatch = useDispatch();

    const { usuarios } = useSelector(state => state.auth);

    const navigate = useNavigate()

    const [userToChange, setUserToChange] = useState()

    const [tokenToVerify, setTokenToVerify] = useState()

    useEffect(() => {
        const tokenResetPassword = window.location.href.split('/')

        if (usuarios) {
            const tokenUser = tokenResetPassword[tokenResetPassword.length - 1]
            const usuarioToRoute = usuarios?.find(usuario => usuario?.tokenUser === tokenUser)

            setUserToChange(usuarioToRoute)
            setTokenToVerify(tokenUser)
    
            if (!usuarioToRoute) {
                userMessageToRedirect(usuarioToRoute)
                navigate('/login', { replace: true })
            }
        }
    
    }, [usuarios, tokenToVerify])
    
    const {handleSubmit, getFieldProps, touched, errors} = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        enableReinitialize: true,
        onSubmit: ({password}) => {
            dispatch(recuperarPass(userToChange?.id, userToChange?.name, userToChange?.lastName, userToChange?.date, userToChange?.email.toLowerCase(), password, userToChange?.role, userToChange?.team, userToChange?.urlImage, tokenToVerify))
            navigate('/login', { replace: true })
        },
        validationSchema: Yup.object({
            password: Yup.string()
                        .required('Requerido'),
            confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password')], 'Las contraseñas deben ser iguales')
                        .required('Requerido'),
            })
        })

    const [showPassword, setShowPassword] = useState(true)
    
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height: '100%', backgroundImage: 'url("https://cdn.pixabay.com/photo/2020/05/21/11/42/hair-salon-5200393_960_720.jpg")', backgroundPosition: 'center center', backgroundSize: 'cover', minHeight: '100vh'}}>
        <div className='shadow p-4 bg-white' style={{borderRadius: '35px', height: 'auto', width: '400px'}}>
            <div className="row d-flex justify-content-center align-items-center">
                <img src={gse} className='img-fluid' style={{objectFit: 'cover', height: 'auto', width: 'auto'}} alt="" />
                <h2 className='text-center my-2'>Gran Salón Express</h2>
                <h6 className='text-center my-2'>Escribe tu nueva contraseña</h6>
                <form onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label>Contraseña</label>
                        <div className="input-group mb-3">
                            <input autoComplete='off' {...getFieldProps('password')} type={(showPassword) ? 'password' : 'text'} placeholder = '********' className = 'form-control' aria-describedby="basic-addon2" />
                            <span style={{cursor: 'pointer'}} onClick={() => setShowPassword(!showPassword)} className="input-group-text" id="basic-addon2"><i style={{color: 'rgb(0, 197, 0)'}} className={(showPassword) ? 'bi bi-eye-slash' : 'bi bi-eye'}></i></span>
                        </div>
                        {touched.password && errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
                        <input autoComplete='off' type={(showPassword) ? 'password' : 'text'} {...getFieldProps('confirmPassword')} placeholder = 'Escribe de nuevo la nueva contraseña' className = 'form-control bg-transparent text-black my-2' />
                        {touched.confirmPassword && errors.confirmPassword && <span style={{color: 'red'}}>{errors.confirmPassword}</span>}
                        
                        <button type='submit' className='btn btn-primary form-control my-3'>Guardar</button>

                        <NavLink to='/login' className='d-flex justify-content-center' style={{color: 'black', textAlign: 'center'}}>¿Sabes tu contraseña? inicia sesión</NavLink>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
