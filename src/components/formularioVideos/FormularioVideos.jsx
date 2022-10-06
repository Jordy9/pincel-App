import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Sidebar } from '../Sidebar'
import { MultiSelect } from "react-multi-select-component";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { actualizarCapacitacionForm, crearCapacitacion } from '../../store/capacitacion/thunk';
import { useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import { ModalPreview } from './ModalPreview';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const FormularioVideos = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const { upload, paraEditar } = useSelector(state => state.cp);

    const { equipos } = useSelector(state => state.eq);
    
    const { usuarios } = useSelector(state => state.auth);

    let arregloEquipos = []

    const [chargeUsersTeam, setChargeUsersTeam] = useState(false)

    const [showErrorVideo, setShowErrorVideo] = useState(false)

    const [changeIndex, setChangeIndex] = useState(null)

    const [showDuration, setShowDuration] = useState(null)

    const [showErrorEvaluacion, setShowErrorEvaluacion] = useState(false)

    if (chargeUsersTeam) {
        equipos?.map(e => arregloEquipos.push({ label: `Equipo de ${e.name}`, value: e.name }))
    
        usuarios?.filter(usuarios => !usuarios?.name?.includes('Jordy'))?.map(e => arregloEquipos.push({ label: e?.name, value: e?.id, team: false }))
    }

    const options = arregloEquipos
    
    const [formValuesTitulo, setFormValuesTitulo] = useState('')

    const [formValuesDescripcion, setFormValuesDescripcion] = useState('')

    const [formValuesIntentos, setFormValuesIntentos] = useState(1)

    const [imag, setimag] = useState()

    const [formValues, setFormValues] = useState([{ titulo: '', video: '', duration: 0 }])

    const [formEvaluacion, setFormEvaluacion] = useState([{ 
        pregunta: '', 
        respuesta: [
            {
                respuesta: '',
                accion: "true"
            },
            {
                respuesta: '',
                accion: "false"
            },
            {
                respuesta: '',
                accion: "false"
            },
            {
                respuesta: '',
                accion: "false"
            }
        ]
    }])

    const [equiposCapacitacion, setEquiposCapacitacion] = useState([])

    const {handleSubmit, touched, errors} = useFormik({
        initialValues: {
            titulo: formValuesTitulo ,
            image: imag,
            descripcion: formValuesDescripcion,
            intentos: formValuesIntentos,
            video: formValues,
            evaluacion: formEvaluacion,
            equipos: equiposCapacitacion
        },
        enableReinitialize: true,
        onSubmit: ({titulo, image, descripcion, video, intentos, evaluacion, equipos}) => {

            let suma = 0

            for (let index = 0; index < video.length; index++) {
                const element = video[index];

                suma = suma + element?.duration

                if (element.video !== '') {
                    if (element.video === paraEditar?.video[index]?.video) {
                        video[index] = {...paraEditar?.video[index], titulo: element?.titulo} 
                    } else {
    
                        if (element?.video?.includes('?v=' && element?.video?.length > 20)) {
                            const normalUrl = element?.video?.split('?v=')
                            const urlAlter = normalUrl[1]?.slice(0, 11)
                            const urlModif = `https://www.youtube.com/embed/${urlAlter}`
                            video[index] = {...video[index], video: urlModif, idVideo: new Date().getTime() + urlAlter + urlModif + element.titulo,  createdAt: new Date(), check: []}
        
                        } else if (element?.video?.includes('youtu.be') && element?.video?.length > 20) {
                            const normalUrl = element?.video?.split('/')
                            const urlAlter = normalUrl[3]
                            const urlModif = `https://www.youtube.com/embed/${urlAlter}`
                            video[index] = {...video[index], video: urlModif, idVideo: new Date().getTime() + urlAlter + urlModif + element.titulo,  createdAt: new Date(), check: []}
        
                        } else if (element?.video?.includes('embed') && element?.video?.length > 20) {
                            const normalUrl = element?.video?.split('/')
                            const urlAlter = normalUrl[4]
                            const urlModif = `https://www.youtube.com/embed/${urlAlter}`
                            video[index] = {...video[index], video: urlModif, idVideo: new Date().getTime() + urlAlter + urlModif + element.titulo,  createdAt: new Date(), check: []}
        
                        } else {
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 5000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                            })
                            
                            return Toast.fire({
                                icon: 'error',
                                title: 'Link de youtube incorrecto'
                            })
                        }
                    }
                }
            }

            if (!paraEditar) {
                dispatch(crearCapacitacion(titulo, image, descripcion, intentos, video, evaluacion, suma, equipos))
                setShowErrorVideo(false)
                setShowErrorEvaluacion(false)
            } else {
                dispatch(actualizarCapacitacionForm(titulo, image, descripcion, intentos, video, evaluacion, suma, equipos))
                setShowErrorVideo(false)
                setShowErrorEvaluacion(false)
            }

        },
        validationSchema: Yup.object({
            titulo: Yup.string()
                        .max(50, 'Debe de tener 50 caracteres o menos')
                        .min(3, 'Debe de tener 3 caracteres o más')
                        .required('Requerido'),
            image: Yup.mixed()
                        .required('Requerido'),
            descripcion: Yup.string()
                        .max(200, 'Debe de tener 200 caracteres o menos')
                        .min(3, 'Debe de tener 3 caracteres o más')
                        .required('Requerido'),
            intentos: Yup.number()
                        .required('Requerido'),
            equipos: Yup.array()
                        .length(1, 'Debe de contener al menos un equipo')
                        .required('Requerido'),
            video: Yup.array().of(Yup.object({
                    titulo: (paraEditar?.publicar === true) && Yup.string().min(3, 'El titulo debe de tener como mínimo 3 caracteres').required('Requerido'),
                    video: (paraEditar?.publicar === true) && Yup.string().required('Requerido'),
                })
            ),
            evaluacion: Yup.array().of(Yup.object({
                    pregunta: (paraEditar?.publicar === true) && Yup.string().min(3, 'El titulo debe de tener como mínimo 3 caracteres').required('Requerido'),
                    respuesta: (paraEditar?.publicar === true) && Yup.array().of(Yup.object({
                        respuesta: (paraEditar?.publicar === true) && Yup.string().min(2, 'La respuesta debe de tener como mínimo 2 caracteres').required('Requerido'),
                        // accion: Yup.boolean().required('Requerido'),
                    }))
                })
            )
        })
    })

    const [evaluacionChange, setEvaluacionChange] = useState(false)

    // useEffect(() => {
    //     if (paraGuardar?.length === formValues?.length) {
    //         let arregloVideo = []
    //         let SumaDuracion = 0
    //         paraGuardar?.map(e => {
    //             SumaDuracion = SumaDuracion + Number(e?.duration)
    //             if (e?.idVideo === undefined) {
    //                 arregloVideo.push({
    //                     titulo: e?.title,
    //                     idVideo: e?.id,
    //                     video: e?.url,
    //                     createdAt: e?.createdAt,
    //                     check: [],
    //                     duration: e?.duration
    //                 })
    //             } else {
    //                 arregloVideo.push(e)
    //             }
    //         })
    //         arregloVideo.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    //         setTituloSubida('imagen')
    //         if (!paraEditar) {
                // dispatch(crearCapacitacion(formValuesTitulo, imag, formValuesDescripcion, formValuesIntentos, arregloVideo, formEvaluacion, SumaDuracion, equiposCapacitacion))
    //             setFormValuesTitulo('')
    //             setimag()
    //             setFormValuesDescripcion('')
    //             setFormValuesIntentos(1)
    //             setFormValues([{ titulo: '', video: '' }])
    //             setFormEvaluacion([{ 
    //                 pregunta: '', 
    //                 respuesta: [
    //                     {
    //                         respuesta: '',
    //                         accion: "true"
    //                     },
    //                     {
    //                         respuesta: '',
    //                         accion: "false"
    //                     },
    //                     {
    //                         respuesta: '',
    //                         accion: "false"
    //                     },
    //                     {
    //                         respuesta: '',
    //                         accion: "false"
    //                     }
    //                 ]
    //             }])
    //             setEquiposCapacitacion([])
    //         } else {
    //             dispatch(actualizarCapacitacionForm(formValuesTitulo, imag, formValuesDescripcion, formValuesIntentos, arregloVideo, formEvaluacion, SumaDuracion, equiposCapacitacion))
    //         }
    //         dispatch(toSaveClear())
    //         setEvaluacionChange(false)
    //     }
    // }, [paraGuardar])
    
    // Contenido de Capacitación de Video

    useEffect(() => {
      if (paraEditar) {
        let videos = []
        paraEditar?.video?.map(video => (
            videos.push({titulo: video.titulo, video: video.video})
        ))
        setFormValues([...videos])
        let PreguntasArreglo = []
        paraEditar?.Preguntas?.map((preguntas) => (
            PreguntasArreglo.push({
                pregunta: preguntas?.pregunta,
                respuesta: [...preguntas?.respuesta]
            })
        ))
        setFormEvaluacion([...PreguntasArreglo])
        setimag(paraEditar?.image)
        setFormValuesDescripcion(paraEditar?.descripcion)
        setFormValuesIntentos(paraEditar?.intentos)
        setEquiposCapacitacion([...paraEditar?.team])
        setFormValuesTitulo(paraEditar?.title)
      }
    }, [paraEditar])

    const handleChange = (i, e) => {
        let newFormValues = [...formValues];
        setChangeIndex(i)
        if (e.target.name === "") {            
            newFormValues[i]['video'] = e.target.value;
            setFormValues(newFormValues);
            if (newFormValues[i]['video'].length > 20 && (newFormValues[i]['video'].includes('?v=') || newFormValues[i]['video'].includes('youtu.be') || newFormValues[i]['video'].includes('embed'))) {
                VideoPreview(i)
            }
        } else {
            newFormValues[i][e.target.name] = e.target.value;
            setFormValues(newFormValues);
        }
     }

    useEffect(() => {
        if (showDuration) {
            let videoConDuration = [{...formValues[changeIndex], duration: showDuration}]
            formValues[changeIndex] = videoConDuration[0]
        }

    }, [changeIndex, showDuration])
    
    const agregar = () => {
        setFormValues([...formValues, { titulo: '', video: '', duration: 0 }])
     }
    
    const eliminar = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    // Contenido de Capacitación de Preguntas

    const handleChangeQuestion = (i, e, index2) => {
        let newFormValues = [...formEvaluacion];
        if (e.target.name === 'respuesta') {
            newFormValues[i].respuesta[index2] = {
                ...newFormValues[i].respuesta[index2],
                [e.target.name]: e.target.value
            }
        } else {
            newFormValues[i][e.target.name] = e.target.value;
        }
        setFormEvaluacion(newFormValues);
     }

     const ref = useRef()
        
    const agregarPregunta = () => {
        setFormEvaluacion([...formEvaluacion, {
            pregunta: '', 
            respuesta: [
                {
                    respuesta: '',
                    accion: "true"
                },
                {
                    respuesta: '',
                    accion: "false"
                },
                {
                    respuesta: '',
                    accion: "false"
                },
                {
                    respuesta: '',
                    accion: "false"
                }
            ]
        }])
        ref?.current?.slickNext()
     }

    const agregarRespuesta = (i) => {
        let nuevasPreguntas = [...formEvaluacion[i].respuesta, {respuesta: '', accion: "false"}]
        setFormEvaluacion([{...formEvaluacion[i], respuesta: nuevasPreguntas}])
     }

    const eliminarRespuesta = (index, i) => {
        let nuevasPreguntas = [...formEvaluacion[index].respuesta]
        nuevasPreguntas.splice(i, 1)
        setFormEvaluacion([{...formEvaluacion[i], respuesta: nuevasPreguntas}])
     }
    
    const eliminarPregunta = (i) => {
        let newFormValues = [...formEvaluacion];
        newFormValues.splice(i, 1);
        setFormEvaluacion(newFormValues)
    }

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: false,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1,
              dots: false
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false
            }
          }
        ]
    };

    const [previewImage, setPreviewImage] = useState()

    const ImagePreview = (i) => {
        if (imag && typeof imag !== 'string') {
            setPreviewImage(URL.createObjectURL(imag))
            URL.revokeObjectURL(imag)
            setModalPreview(true)
        } else {
            setPreviewImage(imag)
            setModalPreview(true)
        }
    }

    const [modalPreview, setModalPreview] = useState(false)

    const [previewVideo, setPreviewVideo] = useState()

    const VideoPreview = (i) => {
        if (formValues[i]?.video && typeof formValues[i]?.video !== 'string') {
            setPreviewVideo(formValues[i].video)
            URL.revokeObjectURL(formValues[i].video)
            setModalPreview(true)
        } else {
            setPreviewVideo(formValues[i].video)
            setModalPreview(true)
        }
    }

    // const onClickVideo = (i) => {
    //     document.getElementById(`fileVideo${i}`).click()
    // }

    const onClickImage = () => {
        document.getElementById('fileImageSelect').click()
    }

    useEffect(() => {
      if (errors.descripcion || errors.equipos || errors.image || errors.intentos || errors.titulo || errors.video) {
        setShowErrorVideo(true)
      }

      if (errors.evaluacion) {
        setShowErrorEvaluacion(true)
      }

    }, [errors])

    const goBack = () => {
        navigate('/ListCapacitaciones')
    }
    
  return (
    <Sidebar>
        <div className='p-4'>
            {
                (!paraEditar)
                    ?
                <h1>Crear capacitación</h1>
                    :
                <h1>Actualizar capacitación</h1>
            }

            <i onClick={goBack}  style={{fontSize: '30px', cursor: 'pointer'}} className="bi bi-arrow-left-circle-fill"></i>

            <form onSubmit={handleSubmit} className='my-5'>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                        <label>Equipos</label>
                        <MultiSelect
                            isLoading = {(chargeUsersTeam && arregloEquipos?.length === 0)}
                            onMenuToggle={(e) => setChargeUsersTeam(e)}
                            options={options}
                            value={equiposCapacitacion}
                            onChange={setEquiposCapacitacion}
                            labelledBy="Select"
                            hasSelectAll = {false}
                            disableSearch
                        />
                        {touched.equipos && errors.equipos && <span style={{color: 'red'}}>{errors.equipos}</span>}
                    </div>
                    
                    <div className="ml-auto col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                        <label>{(!evaluacionChange) ? 'Evaluación' :'Videos'}</label>
                        <button type='button' onClick={() => setEvaluacionChange(!evaluacionChange)} className={`btn ${(!evaluacionChange && showErrorEvaluacion) ? 'btn-danger' : (evaluacionChange && showErrorVideo) ? 'btn-danger' : 'btn-primary' } form-control`}>{(!evaluacionChange) ? 'Ir a la evaluación' :'Ir a los videos'}</button>
                    </div>
                </div>

                {
                    (!evaluacionChange)
                        ?
                    <>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 form-group">
                                <label className='form-label'>Titulo</label>
                                <input value={formValuesTitulo} onChange={({target}) => setFormValuesTitulo(target.value)} type="text" placeholder='Titulo de la capacitación' className='form-control' />
                                {touched?.titulo && errors?.titulo && <span style={{color: 'red'}}>{errors?.titulo}</span>}
                            </div>
        
                            <div className="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 col-xxl-3 form-group">
                                <label className='form-label'>Imagen</label>
                                <button type='button' onClick={onClickImage} className='btn btn-primary form-control'>Seleccionar imagen <i className="bi bi-images btn-primary mx-1"></i></button>
                                <input hidden accept="image/*" type="file" id='fileImageSelect' className='form-control' name='image' onChange={(e) => {
                                    // setFieldValue('image', setimag(e.currentTarget.files[0], (e.currentTarget.files[0]) ? setimag(URL.createObjectURL(e.currentTarget.files[0]) || '') : setimag())
                                    setimag(e.currentTarget.files[0])
                                }} />
                                {touched?.image && errors?.image && <span style={{color: 'red'}}>{errors?.image}</span>}
                            </div>

                            {
                                (imag)
                                    &&
                                <div className="col-1 d-flex align-items-center mt-3">
                                    <button type='button' className='btn btn-primary' onClick={ImagePreview}>
                                        <i className="bi bi-eye"></i>
                                    </button>
                                </div>
                            }

                        </div>

                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-7 col-xl-7 col-xxl-7 form-group">
                                <label className='form-label'>Descripción</label>
                                <input value={formValuesDescripcion} onChange={({target}) => setFormValuesDescripcion(target.value)} type="text" placeholder='Descripción de la capacitación' className='form-control' />                            
                                {touched?.descripcion && errors?.descripcion && <span style={{color: 'red'}}>{errors?.descripcion}</span>}
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 col-xxl-2 form-group">
                                <label className='form-label'>Intentos</label>
                                <input value={formValuesIntentos} min = {1} onChange={({target}) => setFormValuesIntentos(target.value)} type="number" placeholder='Intentos de la evaluación' className='form-control' />                            
                                {touched?.intentos && errors?.intentos && <span style={{color: 'red'}}>{errors?.intentos}</span>}
                            </div>
                        </div>
        
                        {
                            formValues.map((element, index) => {
                                return (
                                    <Fragment key={element + index}>
                                        <button type='button' className='btn btn-primary'>{index + 1}</button>
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-6 col-xxl-6 form-group">
                                                <label className='form-label'>Titulo del video</label>
                                                <input name='titulo' value={element?.titulo} onChange = {(e) => handleChange(index, e)} type="text" placeholder='Titulo del video' className='form-control' />
                                                {touched?.video?.filter(video => video.titulo) && errors?.video?.filter(video => video.titulo) && <span style={{color: 'red'}}>{errors?.video[index]?.titulo}</span>}
                                            </div>
        
                                            <div className="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 col-xxl-3 form-group">
                                                <label className='form-label'>Link del video</label>
                                                {/* <button type='button' onClick={() => onClickVideo(index)} className='btn btn-primary form-control'>Seleccionar video <i className="bi bi-camera-video btn-primary mx-1"></i></button> */}
                                                <input onChange = {(e) => handleChange(index, e)} value = {element?.video} type="text" className='form-control' />
                                                {touched?.video?.filter(video => video?.video) && errors?.video?.filter(video => video.video) && <span style={{color: 'red'}}>{errors?.video[index]?.video}</span>}
                                            </div>
        
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3 form-group">
                                                <label className='form-label'>Acción</label>
                                                <div className="row">
                                                    <div className="col-12">
                                                        {
                                                            (formValues[index]?.video && (formValues[index]?.video?.includes('?v=') || formValues[index]?.video?.includes('youtu.be') || formValues[index]?.video?.includes('embed')) && formValues[index].video?.length > 20)
                                                                &&
                                                            <button type='button' className='btn btn-primary' onClick={() => VideoPreview(index)}>
                                                                <i className="bi bi-eye"></i>
                                                            </button>
                                                        }

                                                        {
                                                            (formValues.length === index + 1)
                                                                &&
                                                            <button onClick={agregar} type='button' className='btn btn-primary mx-1'>
                                                                <i className="bi bi-plus-lg"></i>
                                                            </button>  
                                                        }
        
                                                        {
                                                            (formValues?.length > 1)
                                                                &&
                                                            <button onClick={() => eliminar(index)} type='button' className='btn btn-primary mx-1'>
                                                                <i className="bi bi-trash-fill"></i>
                                                            </button>
                                                        }

                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </Fragment>
                                )
                            })
                        }
                    </>
                        :
                    <Slider ref={ref} {...settings}>
                        {
                            formEvaluacion.map((element, index) => {
                                return (
                                    <Fragment key={element + index}>
                                        <div key={element + index} className="row p-4">
                                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 form-group">
                                                <button className='btn btn-primary my-1 mx-1'>{index + 1}</button>
                                                <label className='form-label'>Pregunta</label>
                                                <input name='pregunta' value={element.pregunta} onChange = {(e) => handleChangeQuestion(index, e)} type="text" placeholder='Titulo de la pregunta' className='form-control' />
                                                {touched?.evaluacion?.filter(evaluacion => evaluacion.pregunta) && errors?.evaluacion?.filter(evaluacion => evaluacion.pregunta) && <span style={{color: 'red'}}>{errors?.evaluacion[index]?.pregunta}</span>}
                                            </div>

                                            {
                                                element?.respuesta?.map((elemento, index2) => {
                                                    return (
                                                        <>
                                                            <div key={elemento + index2} className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8 form-group">
                                                                <label className='form-label'>Respuesta</label>
                                                                <input name='respuesta' value={elemento.respuesta} onChange = {(e) => handleChangeQuestion(index, e, index2)} type="text" placeholder='Respuesta de la pregunta' className='form-control' />
                                                                {touched?.evaluacion?.filter(evaluacion => evaluacion?.respuesta[index]?.respuesta[index2]) && errors?.evaluacion?.filter(evaluacion => evaluacion?.respuesta[index]?.respuesta[index2]) && <span style={{color: 'red'}}>{errors?.evaluacion[index]?.respuesta[index2]?.respuesta}</span>}
                                                            </div>

                                                            <div className="col-xs-12 col-sm-12 col-md-1 col-lg-1 col-xl-1 col-xxl-1 text-center">
                                                                <label className='form-label'>Opciones</label>
                                                                {
                                                                    (elemento.accion === 'true')
                                                                        ?
                                                                    <i style={{fontSize: '23px'}} className="text-success bi bi-check-circle-fill"></i> 
                                                                        :
                                                                    <i style={{fontSize: '23px'}} className="bi bi-x-circle-fill text-danger"></i> 
                                                                }
                                                            </div>

                                                            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 col-xxl-2 d-flex align-items-center mt-3">
                                                                {
                                                                    (element?.respuesta?.length === index2 + 1)
                                                                        &&
                                                                    <button onClick={() => agregarRespuesta(index)} type='button' className='btn btn-primary mx-1'>
                                                                        <i className="bi bi-plus-lg"></i>
                                                                    </button>  
                                                                }
                
                                                                {
                                                                    (element?.respuesta?.length > 1 && index2 > 0)
                                                                        &&
                                                                    <button onClick={() => eliminarRespuesta(index, index2)} type='button' className='btn btn-primary mx-1'>
                                                                        <i className="bi bi-trash-fill"></i>
                                                                    </button>
                                                                }
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }

                                            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2 form-group">
                                                <label className='form-label'>Acción</label>
                                                <div className="row">
                                                    <div className="col-12">
                                                        {
                                                            (formEvaluacion.length === index + 1)
                                                                &&
                                                            <button onClick={agregarPregunta} type='button' className='btn btn-primary mx-1'>
                                                                <i className="bi bi-plus-lg"></i>
                                                            </button>  
                                                        }

                                                        {
                                                            (formEvaluacion.length > 1)
                                                                &&
                                                            <button onClick={() => eliminarPregunta(index)} type='button' className='btn btn-primary mx-1'>
                                                                <i className="bi bi-trash-fill"></i>
                                                            </button>
                                                        }
                                                    </div>
                                                </div>
                                                
                                            </div>

                                        </div>
                                    </Fragment>
                                )
                            })
                        }
                    </Slider>
                }

                {
                    (upload !== 0)
                        ?
                    <div className="progress2">
                        <div className="progress-bar" role="progressbar" style={{width: `${upload}%`, backgroundColor: 'rgb(89, 7, 211)', color: 'white', borderRadius: 100}} aria-valuemin="0" aria-valuemax="100">Subiendo imagen {upload}%</div>
                    </div>
                        :
                    <div className='d-grid gap-2 col-6 mx-auto'>
                        <button hidden = {(!evaluacionChange)} type='submit' className = 'btn btn-primary'>Guardar</button>
                    </div>
                }

            </form>
        </div>

        <ModalPreview 
            modalPreview={modalPreview} 
            setModalPreview = {setModalPreview} 
            preview = {previewImage} 
            previewVideo = {previewVideo} 
            setPreviewImage = {setPreviewImage}
            setPreviewVideo = {setPreviewVideo}
            setShowDuration = {setShowDuration}
            showDuration = {showDuration}
        />
    </Sidebar>
  )
}
