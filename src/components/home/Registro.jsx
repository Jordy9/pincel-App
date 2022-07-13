import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { iniciarRegistro } from '../../store/auth/thunk'

export const Registro = () => {

    const dispatch = useDispatch()

    const {handleSubmit, getFieldProps, resetForm, touched, errors} = useFormik({
        initialValues: {
            name: '', 
            lastName: '', 
            email: '',
            password: '',
            confirmPassword: ''
        },
        enableReinitialize: true,
        onSubmit: ({name, lastName, email, password}) => {
            console.log(name)
            dispatch(iniciarRegistro(name, lastName, email.toLowerCase(), password))
            resetForm({
                name: '', 
                lastName: '', 
                email: '',
                password: '',
                confirmPassword: ''
            })
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
            email: Yup.string()
                        .email('La dirección de email no es válida')
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

  return (
    <div className='d-flex justify-content-center align-items-center' style={{height: '100%', backgroundImage: 'url("https://cdn.pixabay.com/photo/2020/05/21/11/42/hair-salon-5200393_960_720.jpg")', backgroundPosition: 'center center', backgroundSize: 'cover', minHeight: '100vh'}}>
        <div className='shadow p-4 bg-white' style={{borderRadius: '35px', height: 'auto', width: '400px'}}>
            <div className="row d-flex justify-content-center align-items-center">
                <img src="https://lh3.googleusercontent.com/a-/AFdZucrCCnOQ3GwmkuCz5Y3g0kDY-Vzre4AaDn2H8soW7g=s96-c-rg-br100" className='img-fluid' style={{objectFit: 'cover', height: 'auto', width: 'auto'}} alt="" />
                <h2 className='text-center my-2'>Salón Express</h2>
                <div className="col-12">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 form-group">
                                <label>Nombre</label>
                                <input {...getFieldProps('name')} type="text" placeholder = 'Juan' className = 'form-control bg-transparent text-black' />
                                {touched.name && errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 form-group">
                                <label>Apellido</label>
                                <input {...getFieldProps('lastName')} type="text" placeholder = 'Taveras' className = 'form-control bg-transparent text-black' />
                                {touched.lastName && errors.lastName && <span style={{color: 'red'}}>{errors.lastName}</span>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 form-group">
                                <label>Correo Electrónico</label>
                                <input {...getFieldProps('email')} type="text" placeholder = 'Ejemplo@hotmail.com' className = 'form-control bg-transparent text-black ' />
                                {touched.email && errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
                            </div>
                        </div>

                        <div className="row">

                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 form-group">
                                <label>Cambiar contraseña</label>
                                <input {...getFieldProps('password')} type="text" placeholder = '********' className = 'form-control bg-transparent text-black ' />
                                {touched.password && errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 form-group">
                                <label>Confirmar contraseña</label>
                                <input {...getFieldProps('confirmPassword')} type="text" placeholder = '********' className = 'form-control bg-transparent text-black ' />
                                {touched.confirmPassword && errors.confirmPassword && <span style={{color: 'red'}}>{errors.confirmPassword}</span>}
                            </div>
                        </div>
                        
                        <button type='submit' className='btn btn-primary form-control my-3'>Registrarse</button>
                    </form>

                    <NavLink to='/Login' className='d-flex justify-content-center' style={{textDecoration: 'none', color: 'black', textAlign: 'center'}}>¿Ya tienes una cuenta? Inicia Sesión</NavLink>
                </div>
            </div>
        </div>
    </div>
  )
}
