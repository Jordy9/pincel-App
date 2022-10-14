// import React, { useEffect, useState } from 'react'
// import { Modal } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import { useFormik } from 'formik'
// import * as Yup from 'yup'
// import { iniciarActualizacionModalUser } from '../../store/auth/thunk'
// import user from '../../heroes/user.webp'

// export const ModalPerfilUser = ({modalShow, setModalShow}) => {

//     const dispatch = useDispatch();

//     const { activeUser } = useSelector(state => state.auth);

//     const { equipos } = useSelector(state => state.eq);

//     const { capacitacion } = useSelector(state => state.cp);

//     const { evaluacion } = useSelector(state => state.ev);

//     // Desde capacitaciones realizadas hasta indice

//     let sumaPorcentage = []

//     capacitacion?.filter(
//         capacitacion => capacitacion?.publicar === true 
//           && 
//         capacitacion?.team?.some(team => team?.value === activeUser?.id || team?.value === activeUser?.team)
//       )?.map(({video}) => {
//         const CantidadCheck = video?.filter(video => video?.check?.includes(activeUser?.id))
    
//         const porcentaje = parseInt((CantidadCheck?.length / video?.length) * 100)   
//         return (
//           (porcentaje === 100) && sumaPorcentage.push(porcentaje)
//         )
//       })

//     let arregloEquipos = []

//     const evaluacionesFiltradas = evaluacion?.filter(evaluacion => evaluacion?.calificacion < 90 && evaluacion?.idUsuario === activeUser?.id)

//     const capacitacionMostrar = capacitacion?.filter(
//         capacitacion => evaluacionesFiltradas?.some(evaluacion => evaluacion.idCapacitacion === capacitacion?._id)
//           &&
//         capacitacion?.usuariosEvaluacion?.some(intentos => intentos?.id === activeUser?.id && intentos?.intentos === 0)
//       )

//     const equipoFiltrado = capacitacion?.filter(
//         capacitacion => capacitacion?.publicar === true 
//           && 
//         capacitacion?.team?.some(team => team?.value === activeUser?.id || team?.value === activeUser?.team)
//     )

//     const evaluacionFiltrada = evaluacion?.filter(evaluacion => evaluacion?.idUsuario === activeUser?.id)

//     let suma = 0

//     evaluacionFiltrada?.map(evaluacion => suma = suma + evaluacion?.calificacion)

//     const totalSumado = suma/evaluacionFiltrada?.length || 0

//     let sumaCursosCompletos = equipoFiltrado?.length-sumaPorcentage?.length

//     let totalCursos = equipoFiltrado?.length

//     const porcentage = (5*totalSumado) / 100 || 5

//     // Fin desde capacitaciones realizadas hasta indice

//     equipos?.map(e => arregloEquipos.push({ label: `Equipo de ${e.name}`, value: e.name }))

//     const [ImagePerfil, setImagePerfil] = useState(null)
//     const [ImagePerfilShow, setImagePerfilShow] = useState(activeUser?.urlImage)

//     const {handleSubmit, getFieldProps, touched, errors} = useFormik({
//         initialValues: {
//             name: activeUser?.name,
//             lastName: activeUser?.lastName,
//             email: activeUser?.email,
//             date: activeUser?.date,
//             team: activeUser?.team,
//             role: activeUser?.role,
//             urlImage: ImagePerfil,
//             password: '',
//             confirmPassword: ''
//         },
//         enableReinitialize: true,
//         onSubmit: ({name, lastName, email, date, team, role, urlImage, password}) => {
//             console.log(name)
//             if (!password) {
//                 password = activeUser?.password
//             }
//             dispatch(iniciarActualizacionModalUser(activeUser?.id, name, lastName, email.toLowerCase(), date, team, role, urlImage, password))
//         },
//         validationSchema: Yup.object({
//             name: Yup.string()
//                         .max(50, 'Debe de tener 50 caracteres o menos')
//                         .min(3, 'Debe de tener 3 caracteres o más')
//                         .required('Requerido'),
//             lastName: Yup.string()
//                         .max(50, 'Debe de tener 50 caracteres o menos')
//                         .min(3, 'Debe de tener 3 caracteres o más')
//                         .required('Requerido'),
//             email: Yup.string()
//                         .email('La dirección de email no es válida')
//                         .required('Requerido'),
//             role: Yup.string()
//                         .required('Requerido'),
//         })
//     })

//     const handleClose = () => {
//         setModalShow(false)
//     }

//     const handledButton = () => {
//         document.getElementById('idButtonModalUser').click()
//     }

//     const onClickImage = () => {
//         document.getElementById('fileSelectorPerfilModal').click()
//     }

//     useEffect(() => {
//         if (ImagePerfil) {
//           setImagePerfilShow(URL.createObjectURL(ImagePerfil))
//         }
  
//         return () => URL.revokeObjectURL(ImagePerfilShow)
  
//     }, [ImagePerfil])

//   return (
//     <Modal fullscreen show={modalShow} onHide={handleClose}>
//         <Modal.Header style={{border: 'none'}} closeButton>
//           <Modal.Title><h1>Ver o actualizar usuario</h1></Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//             <form onSubmit={handleSubmit}>
//                 <div className="row p-4">
//                     <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
//                         <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 d-flex justify-content-center align-items-center">
//                             <img src={ImagePerfilShow || user} style={{maxWidth: '250px', maxHeight: '250px', width: '250px', height: '250px', objectFit: 'cover', clipPath: 'circle()'}} alt="" />
//                         </div>

//                         <div className='d-grid gap-2 col-6 mx-auto mt-4'>
//                             <button type='button' onClick={onClickImage} className='btn btn-primary form-control'>Foto de perfil <i className="bi bi-images btn-primary mx-1"></i></button>
//                             <input accept="image/*" id='fileSelectorPerfilModal' hidden = {true} type="file" className='form-control bg-transparent text-black' onChange={(e) => {
//                                 setImagePerfil(e.currentTarget.files[0])
//                             }} />
//                         </div>
//                     </div>

//                     <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8 col-xl-8 col-xxl-8 shadow p-4 my-auto" style={{borderRadius: '35px'}}>
//                         <div className="row">
//                             <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
//                                 <label>Nombre</label>
//                                 <input type="text" {...getFieldProps('name')} placeholder='Nombre' className='form-control' />
//                                 {touched.name && errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
//                             </div>

//                             <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
//                                 <label>Apellido</label>
//                                 <input type="text" {...getFieldProps('lastName')} placeholder='Apellido' className='form-control' />
//                                 {touched.lastName && errors.lastName && <span style={{color: 'red'}}>{errors.lastName}</span>}
//                             </div>

//                             <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
//                                 <label>Correo electrónico</label>
//                                 <input type="text" {...getFieldProps('email')} placeholder='Correo electrónico' className='form-control' />
//                                 {touched.email && errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
//                             </div>
//                         </div>

//                         <div className="row">
//                             <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
//                                 <label>Fecha de nacimiento</label>
//                                 <input type="date" {...getFieldProps('date')} placeholder='Fecha de nacimiento' className='form-control' />
//                                 {touched.date && errors.date && <span style={{color: 'red'}}>{errors.date}</span>}
//                             </div>

//                             <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
//                                 <label>Rol del usuario</label>
//                                 <select className="form-select" {...getFieldProps('role')} aria-label="Default select example">
//                                     <option value="">Seleccione un rol</option>
//                                     <option value="Administrador">Administrador</option>
//                                     <option value="Usuario">Usuario</option>
//                                 </select>
//                                 {touched.role && errors.role && <span style={{color: 'red'}}>{errors.role}</span>}
//                             </div>

//                             <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
//                                 <div className="form-group">
//                                     <label>Equipo</label>
//                                     <select {...getFieldProps('team')} className='form-select'>
//                                         <option value="">Seleccione un equipo</option>
//                                         {
//                                             arregloEquipos?.map(equipo => {
//                                                 return (
//                                                     <option value={equipo?.value}>{equipo?.label}</option>
//                                                 )
//                                             })
//                                         }
//                                     </select>
//                                     {touched.team && errors.team && <span style={{color: 'red'}}>{errors.team}</span>}
//                                 </div>
//                             </div>

//                             <div className = 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
//                                 <div className="form-group">
//                                     <label>Contraseña</label>
//                                     <input {...getFieldProps('password')} type="password" placeholder='********' className='form-control' />
//                                     {touched.password && errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
//                                 </div>
//                             </div>

//                             <div className = 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
//                                 <div className="form-group">
//                                     <label>Confirmar contraseña</label>
//                                     <input {...getFieldProps('confirmPassword')} type="password" placeholder='********' className='form-control' />
//                                     {touched.confirmPassword && errors.confirmPassword && <span style={{color: 'red'}}>{errors.confirmPassword}</span>}
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="row">
//                             <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 form-group">
//                                 <label>Capacitaciones realizadas</label>
//                                 <input type="text" readOnly value={`${sumaCursosCompletos || 0}/${totalCursos || 0}`} placeholder='10' className='form-control' />
//                             </div>

//                             <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 form-group">
//                                 <label>Capacitaciones por mejorar</label>
//                                 <input type="text" readOnly value={capacitacionMostrar?.length} placeholder='0' className='form-control' />
//                             </div>

//                             <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 form-group">
//                                 <label>Promedio</label>
//                                 <input type="text" readOnly value={totalSumado} placeholder='90' className='form-control' />
//                             </div>

//                             <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 form-group">
//                                 <label>Indice</label>
//                                 <input type="text" readOnly value={`${porcentage}/5`} placeholder='4' className='form-control' />
//                             </div>
//                         </div>
//                     </div>
//                     <button type='submit' id='idButtonModalUser' hidden></button>
//                 </div>
//             </form>
//         </Modal.Body>
//         <Modal.Footer>
//             <button type='submit' onClick={handledButton} className='btn btn-primary'>
//                 Guardar
//             </button>

//             <button onClick={handleClose} className='btn btn-danger'>
//                 Desactivar usuario
//             </button>
//         </Modal.Footer>
//     </Modal>
//   )
// }
