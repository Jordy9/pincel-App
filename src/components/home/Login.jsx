import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { iniciarLogin } from '../../store/auth/thunk'
import gse from '../../heroes/gse.png'

export const Login = () => {

    const dispatch = useDispatch();

    const email = localStorage.getItem('email')

    const [remember, setRemember] = useState();

    useEffect(() => {
      if (email) {
        setRemember(true)
      }
    }, [email]);

    const {handleSubmit, getFieldProps} = useFormik({
        initialValues: {
            email: localStorage.getItem('email') || '', 
            password: '', 
            rememberme: (email) ? true : false
        },
        enableReinitialize: true,
        onSubmit: ({email, password, rememberme}) => {
            (rememberme)
                ?
            localStorage.setItem('email', email)
            :
            localStorage.removeItem('email')
            dispatch(iniciarLogin(email.toLowerCase(), password))

        },
        validationSchema: Yup.object({
        })
    })

  return (
    <div className='d-flex justify-content-center align-items-center' style={{height: '100%', backgroundImage: 'url("https://cdn.pixabay.com/photo/2020/05/21/11/42/hair-salon-5200393_960_720.jpg")', backgroundPosition: 'center center', backgroundSize: 'cover', minHeight: '100vh'}}>
        <div className='shadow p-4 bg-white' style={{borderRadius: '35px', height: 'auto', width: '400px'}}>
            <div className="row d-flex justify-content-center align-items-center">
                <img src={gse} className='img-fluid' style={{objectFit: 'cover', height: 'auto', width: 'auto'}} alt="" />
                <h2 className='text-center my-2'>Gran Salón Express</h2>
                <h6 className='text-center my-2'>Capacitate de una forma entretenida</h6>
                <form onSubmit={handleSubmit}>
                    <div className="col-12">
                        <div className="row my-3">
                            <div className="col-12">
                                <label>Correo electrónico</label>
                                <input {...getFieldProps('email')} type="text" placeholder = 'Ejemplo@gmail.com' className = 'form-control' />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 form-group">
                                <label>Contraseña</label>
                                <input {...getFieldProps('password')} type="text" placeholder = '********' className = 'form-control' />
                            </div>
                        </div>

                        <div className="form-check">
                            <input {...getFieldProps('rememberme')} defaultChecked = {(email) && true} type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label">Recuerdame</label>
                        </div>
                        
                        <button type='submit' className='btn btn-primary form-control my-3'>Iniciar Sesión</button>

                        {/* <NavLink to='/Registro' className='d-flex justify-content-center' style={{textDecoration: 'none', color: 'black', textAlign: 'center'}}>¿Aún no tienes una cuenta? Registrate</NavLink> */}
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
