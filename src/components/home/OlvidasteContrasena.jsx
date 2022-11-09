import React from 'react'
import { useDispatch } from 'react-redux'
import gse from '../../heroes/gse.png'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { NavLink } from 'react-router-dom'
import { recuperarCont } from '../../store/auth/thunk'
import Swal from 'sweetalert2'

export const OlvidasteContrasena = () => {

    const dispatch = useDispatch();

    const {handleSubmit, getFieldProps} = useFormik({
        initialValues: {
            email: '', 
        },
        enableReinitialize: true,
        onSubmit: ({email}) => {
            dispatch(recuperarCont(email.toLowerCase()))

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            
            return Toast.fire({
                icon: 'success',
                title: 'Verifique su correo electrónico'
            })
        },
        validationSchema: Yup.object({
            email: Yup.string()
                        .email('La dirección de email no es válida')
                        .required('Requerido'),
            })
        })
    
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height: '100%', backgroundImage: 'url("https://cdn.pixabay.com/photo/2020/05/21/11/42/hair-salon-5200393_960_720.jpg")', backgroundPosition: 'center center', backgroundSize: 'cover', minHeight: '100vh'}}>
        <div className='shadow p-4 bg-white' style={{borderRadius: '35px', height: 'auto', width: '400px'}}>
            <div className="row d-flex justify-content-center align-items-center">
                <img src={gse} className='img-fluid' style={{objectFit: 'cover', height: 'auto', width: 'auto'}} alt="" />
                <h2 className='text-center my-2'>Gran Salón Express</h2>
                <h6 className='text-center my-2'>Recupera tu contraseña</h6>
                <form onSubmit={handleSubmit}>
                    <div className="col-12">
                        <div className="row my-3">
                            <div className="col-12">
                                <label>Correo electrónico</label>
                                <input autoComplete='off' {...getFieldProps('email')} type="text" placeholder = 'Ejemplo@gmail.com' className = 'form-control' />
                            </div>
                        </div>
                        
                        <button type='submit' className='btn btn-primary form-control my-3'>Enviar</button>

                        <NavLink to='/login' className='d-flex justify-content-center' style={{color: 'black', textAlign: 'center'}}>¿Sabes tu contraseña? inicia sesión</NavLink>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
