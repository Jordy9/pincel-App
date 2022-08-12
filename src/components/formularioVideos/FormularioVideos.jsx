import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Sidebar } from '../Sidebar'
import { MultiSelect } from "react-multi-select-component";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { actualizarCapacitacionForm, actualizarVideos, crearCapacitacion, crearVideos } from '../../store/capacitacion/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { toSaveClear } from '../../store/capacitacion/capacitacionSlice';
import Slider from "react-slick";
import { mixed } from 'yup';

const options = [
    { label: "Equipo de Servicio", value: "Servicio" },
    { label: "Equipo de Shamponier", value: "Shamponier" },
    { label: "Equipo de Uñas", value: "Unas"},
    { label: "Equipo de Estilistas", value: "Estilista"},
    { label: "Administrador", value: "Administrador"},
  ];

export const FormularioVideos = () => {

    const dispatch = useDispatch();

    const { paraGuardar, upload, paraEditar } = useSelector(state => state.cp);
    
    const [formValuesTitulo, setFormValuesTitulo] = useState('')

    const [formValuesDescripcion, setFormValuesDescripcion] = useState('')

    const [formValuesIntentos, setFormValuesIntentos] = useState(1)

    const [imag, setimag] = useState()

    const [formValues, setFormValues] = useState([{ titulo: '', video: '' }])

    const [formEvaluacion, setFormEvaluacion] = useState([{ 
        pregunta: '', 
        respuesta1: '', 
        respuesta2: '', 
        respuesta3: '', 
        respuesta4: '',
        accion1: '', 
        accion2: '', 
        accion3: '', 
        accion4: '' 
    }])

    const [tituloSubida, setTituloSubida] = useState('')

    const [equiposCapacitacion, setEquiposCapacitacion] = useState([])

    const [indiceActualizar, setindiceActualizar] = useState([])

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
        onSubmit: ({titulo, image, video, evaluacion, equipos}) => {

            // if (paraEditar) {
            //     dispatch(toSave(paraEditar?.video))
            // }

            for (let index = 0; index < video.length; index++) {
                const element = video[index];

                if (!paraEditar) {
                    dispatch(crearVideos(element))
                } else {
                    dispatch(actualizarVideos(element, indiceActualizar[index], index))
                }
                
                setTituloSubida('videos')
            }

            // image: document.getElementsByName('image').value = ''

            // setimag()

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
                        // .length(1, 'Debe de contener al menos un equipo')
                        .required('Requerido'),
            video: Yup.array().of(Yup.object({
                    titulo: Yup.string().min(3, 'El titulo debe de tener como mínimo 3 caracteres').required('Requerido'),
                    video: mixed().required('Requerido')
                })
            ),
            evaluacion: Yup.array().of(Yup.object({
                    pregunta: Yup.string().min(3, 'El titulo debe de tener como mínimo 3 caracteres').required('Requerido'),
                    respuesta1: Yup.string().min(2, 'La respuesta debe de tener como mínimo 2 caracteres').required('Requerido'),
                    respuesta2: Yup.string().min(2, 'La respuesta debe de tener como mínimo 2 caracteres').required('Requerido'),
                    respuesta3: Yup.string().min(2, 'La respuesta debe de tener como mínimo 2 caracteres').required('Requerido'),
                    respuesta4: Yup.string().min(2, 'La respuesta debe de tener como mínimo 2 caracteres').required('Requerido'),
                })
            )
        })
    })

    const [evaluacionChange, setEvaluacionChange] = useState(false)

    useEffect(() => {
        if (paraGuardar?.length === formValues?.length) {
            console.log(paraGuardar)
            let arregloVideo = []
            let SumaDuracion = 0
            paraGuardar?.map(e => {
                console.log(e)
                SumaDuracion = SumaDuracion + Number(e?.duration)
                if (e?.idVideo === undefined) {
                    arregloVideo.push({
                        titulo: e?.title,
                        idVideo: e?.id,
                        video: e?.url,
                        createdAt: e?.createdAt,
                        check: [],
                        duration: e?.duration
                    })
                } else {
                    arregloVideo.push(e)
                }
            })
            setTituloSubida('imagen')
            if (!paraEditar) {
                dispatch(crearCapacitacion(formValuesTitulo, imag, formValuesDescripcion, formValuesIntentos, arregloVideo, formEvaluacion, SumaDuracion, equiposCapacitacion))
                setFormValuesTitulo('')
                setimag()
                setFormValuesDescripcion('')
                setFormValuesIntentos(1)
                setFormValues([{ titulo: '', video: '' }])
                setFormEvaluacion([{ pregunta: '', respuesta1: '', respuesta2: '', respuesta3: '', respuesta4: '', accion1: '', accion2: '', accion3: '', accion4: '' }])
                setEquiposCapacitacion([])
                setindiceActualizar([])
            } else {
                dispatch(actualizarCapacitacionForm(formValuesTitulo, imag, formValuesDescripcion, formValuesIntentos, arregloVideo, formEvaluacion, SumaDuracion, equiposCapacitacion))
                setFormValuesTitulo('')
                setimag()
                setFormValuesDescripcion('')
                setFormValuesIntentos(1)
                setFormValues([{ titulo: '', video: '' }])
                setFormEvaluacion([{ 
                    pregunta: '', 
                    respuesta1: '', 
                    respuesta2: '', 
                    respuesta3: '', 
                    respuesta4: '',
                    accion1: '', 
                    accion2: '', 
                    accion3: '', 
                    accion4: ''  
                }])
                setEquiposCapacitacion([])
                setindiceActualizar([])
            }
            dispatch(toSaveClear())
            setEvaluacionChange(false)
        }
    }, [paraGuardar])
    
    // Contenido de Capacitación de Video

    useEffect(() => {
      if (paraEditar) {
        let videos = []
        paraEditar?.video?.map(video => (
            videos.push({titulo: video.titulo, video: video.video})
        ))
        setFormValues([...videos])
        let PreguntasArreglo = []
        paraEditar?.Preguntas?.map(preguntas => (
            PreguntasArreglo.push({
                pregunta: preguntas?.pregunta, 
                respuesta1: preguntas?.respuesta1, 
                respuesta2: preguntas?.respuesta2, 
                respuesta3: preguntas?.respuesta3, 
                respuesta4: preguntas?.respuesta4 ,
                accion1: preguntas?.accion1,
                accion2: preguntas?.accion2,
                accion3: preguntas?.accion3,
                accion4: preguntas?.accion4,
            })
        ))
        setFormEvaluacion([...PreguntasArreglo])
        setimag(paraEditar?.image)
        setEquiposCapacitacion([...paraEditar?.team])
        setFormValuesTitulo(paraEditar?.title)
      }
    }, [paraEditar])

    const handleChange = (i, e) => {
        let newFormValues = [...formValues];
        setindiceActualizar(indiceActualizar => [...indiceActualizar, i])
        if (e.target.name === "") {            
            newFormValues[i]['video'] = e.target.files[0];
            setFormValues(newFormValues);
        } else {
            newFormValues[i][e.target.name] = e.target.value;
            setFormValues(newFormValues);
        }
     }
        
    const agregar = () => {
        setFormValues([...formValues, { titulo: '', video: '' }])
     }
    
    const eliminar = (i) => {
        console.log(i)
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    // Contenido de Capacitación de Preguntas

    const handleChangeQuestion = (i, e) => {
        let newFormValues = [...formEvaluacion];
        newFormValues[i][e.target.name] = e.target.value;
        setFormEvaluacion(newFormValues);
     }

     const ref = useRef()
        
    const agregarPregunta = () => {
        setFormEvaluacion([...formEvaluacion, { 
            pregunta: '', 
            respuesta1: '', 
            respuesta2: '', 
            respuesta3: '', 
            respuesta4: '', 
            accion1: '', 
            accion2: '', 
            accion3: '', 
            accion4: '' 
        }])
        ref?.current?.slickNext()
     }
    
    const eliminarPregunta = (i) => {
        console.log(i)
        let newFormValues = [...formEvaluacion];
        newFormValues.splice(i, 1);
        setFormEvaluacion(newFormValues)
    }

    // const handleVideo = () => {
    //     document.getElementById('fileVideo').click()
    // }

    const settings = {
        dots: true,
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
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1,
              dots: true
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true
            }
          }
        ]
    };

  return (
    <Sidebar>
        <div className='p-4'>
            <h1>Crear capacitación</h1>

            <form onSubmit={handleSubmit} className='my-5'>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                        <label>Equipos</label>
                        <MultiSelect
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
                        <button type='button' onClick={() => setEvaluacionChange(!evaluacionChange)} className='btn btn-primary form-control'>{(!evaluacionChange) ? 'Crear evaluación' :'Crear videos'}</button>
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
                                <input accept="image/*" type="file" className='form-control' name='image' onChange={(e) => {
                                    // setFieldValue('image', setimag(e.currentTarget.files[0], (e.currentTarget.files[0]) ? setimag(URL.createObjectURL(e.currentTarget.files[0]) || '') : setimag())
                                    setimag(e.currentTarget.files[0])
                                }} />
                                {touched?.image && errors?.image && <span style={{color: 'red'}}>{errors?.image}</span>}
                            </div>
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
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-6 col-xxl-6 form-group">
                                                <label className='form-label'>Titulo del video</label>
                                                <input name='titulo' value={element.titulo} onChange = {(e) => handleChange(index, e)} type="text" placeholder='Titulo del video' className='form-control' />
                                                {touched?.video?.filter(video => video.titulo) && errors?.video?.filter(video => video.titulo) && <span style={{color: 'red'}}>{errors?.video[index]?.titulo}</span>}
                                            </div>
        
                                            <div className="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 col-xxl-3 form-group">
                                                <label className='form-label'>Video</label>
                                                <input accept="video/*" id='fileVideo' onChange = {(e) => handleChange(index, e)} type="file" className='form-control' />
                                                {touched?.video?.filter(video => video.video) && errors?.video?.filter(video => video.video) && <span style={{color: 'red'}}>{errors?.video[index]?.video}</span>}
                                            </div>
        
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3 form-group">
                                                <label className='form-label'>Acción</label>
                                                <div className="row">
                                                    <div className="col-12">
                                                        {
                                                            (formValues.length === index + 1)
                                                                &&
                                                            <button onClick={agregar} type='button' className='btn btn-primary mx-1'>
                                                                <i className="bi bi-plus-lg"></i>
                                                            </button>  
                                                        }
        
                                                        {
                                                            (index !== 0)
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
                                        <div className="row p-4">
                                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 form-group">
                                                <button className='btn btn-primary my-1 mx-1'>{index + 1}</button>
                                                <label className='form-label'>Pregunta</label>
                                                <input name='pregunta' value={element.pregunta} onChange = {(e) => handleChangeQuestion(index, e)} type="text" placeholder='Titulo de la pregunta' className='form-control' />
                                                {touched?.evaluacion?.filter(evaluacion => evaluacion.pregunta) && errors?.evaluacion?.filter(evaluacion => evaluacion.pregunta) && <span style={{color: 'red'}}>{errors?.evaluacion[index]?.pregunta}</span>}
                                            </div>

                                            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8 form-group">
                                                <label className='form-label'>Respuesta</label>
                                                <input name='respuesta1' value={element.respuesta1} onChange = {(e) => handleChangeQuestion(index, e)} type="text" placeholder='Respuesta de la pregunta' className='form-control' />
                                                {touched?.evaluacion?.filter(evaluacion => evaluacion.respuesta1) && errors?.evaluacion?.filter(evaluacion => evaluacion.respuesta1) && <span style={{color: 'red'}}>{errors?.evaluacion[index]?.respuesta1}</span>}
                                            </div>

                                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                                <label className='form-label'>Opciones</label>
                                                <select name="accion1" value={element.accion1} className='form-control' onChange={(e) => handleChangeQuestion(index, e)}>
                                                    <option value=''>Seleccione una opción</option>
                                                    <option value={true}>Correcta</option>
                                                    <option value={false}>Incorrecta</option>
                                                </select>
                                            </div>

                                            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8 form-group">
                                                <label className='form-label'>Respuesta</label>
                                                <input name='respuesta2' value={element.respuesta2} onChange = {(e) => handleChangeQuestion(index, e)} type="text" placeholder='Respuesta de la pregunta' className='form-control' />
                                                {touched?.evaluacion?.filter(evaluacion => evaluacion.respuesta2) && errors?.evaluacion?.filter(evaluacion => evaluacion.respuesta2) && <span style={{color: 'red'}}>{errors?.evaluacion[index]?.respuesta2}</span>}
                                            </div>

                                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                                <label className='form-label'>Opciones</label>
                                                <select name="accion2" value={element.accion2} className='form-control' onChange={(e) => handleChangeQuestion(index, e)}>
                                                    <option value=''>Seleccione una opción</option>
                                                    <option value={true}>Correcta</option>
                                                    <option value={false}>Incorrecta</option>
                                                </select>
                                            </div>

                                            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8 form-group">
                                                <label className='form-label'>Respuesta</label>
                                                <input name='respuesta3' value={element.respuesta3} onChange = {(e) => handleChangeQuestion(index, e)} type="text" placeholder='Respuesta de la pregunta' className='form-control' />
                                                {touched?.evaluacion?.filter(evaluacion => evaluacion.respuesta3) && errors?.evaluacion?.filter(evaluacion => evaluacion.respuesta3) && <span style={{color: 'red'}}>{errors?.evaluacion[index]?.respuesta3}</span>}
                                            </div>

                                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                                <label className='form-label'>Opciones</label>
                                                <select name="accion3" value={element.accion3} className='form-control' onChange={(e) => handleChangeQuestion(index, e)}>
                                                    <option value=''>Seleccione una opción</option>
                                                    <option value={true}>Correcta</option>
                                                    <option value={false}>Incorrecta</option>
                                                </select>
                                            </div>

                                            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8 form-group">
                                                <label className='form-label'>Respuesta</label>
                                                <input name='respuesta4' value={element.respuesta4} onChange = {(e) => handleChangeQuestion(index, e)} type="text" placeholder='Respuesta de la pregunta' className='form-control' />
                                                {touched?.evaluacion?.filter(evaluacion => evaluacion.respuesta4) && errors?.evaluacion?.filter(evaluacion => evaluacion.respuesta4) && <span style={{color: 'red'}}>{errors?.evaluacion[index]?.respuesta4}</span>}
                                            </div>

                                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                                <label className='form-label'>Opciones</label>
                                                <select name="accion4" value={element.accion4} className='form-control' onChange={(e) => handleChangeQuestion(index, e)}>
                                                    <option value=''>Seleccione una opción</option>
                                                    <option value={true}>Correcta</option>
                                                    <option value={false}>Incorrecta</option>
                                                </select>
                                            </div>

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
                                                            (index !== 0)
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
                        &&
                    <div className="progress2 my-2">
                        <div className="progress-bar" role="progressbar" style={{width: `${upload}%`, backgroundColor: 'rgb(89, 7, 211)', color: 'white', borderRadius: 100}} aria-valuemin="0" aria-valuemax="100">Subiendo {tituloSubida} {upload}%</div>
                    </div>
                }

                <div className='d-grid gap-2 col-6 mx-auto'>
                    <button hidden = {(!evaluacionChange)} type='submit' className = 'btn btn-primary  my-2'>Guardar</button>
                </div>
            </form>
        </div>
    </Sidebar>
  )
}
