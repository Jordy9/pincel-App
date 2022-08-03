import React, { Fragment, useEffect, useState } from 'react'
import { Sidebar } from '../Sidebar'
import { MultiSelect } from "react-multi-select-component";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { crearCapacitacion, crearVideos } from '../../store/capacitacion/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { toSaveClear } from '../../store/capacitacion/capacitacionSlice';

const options = [
    { label: "Equipo de Servicio", value: "Servicio" },
    { label: "Equipo de Shamponier", value: "Shamponier" },
    { label: "Equipo de Uñas", value: "Unas"},
    { label: "Equipo de Estilistas", value: "Estilista"},
    { label: "Administrador", value: "Administrador"},
  ];

export const FormularioVideos = () => {

    const dispatch = useDispatch();

    const { paraGuardar } = useSelector(state => state.cp);
    
    const [formValuesTitulo, setFormValuesTitulo] = useState('')

    const [imag, setimag] = useState()

    const [formValues, setFormValues] = useState([{ titulo: '', video: '' }])

    const [formEvaluacion, setFormEvaluacion] = useState([{ pregunta: '', respuesta: '' }])

    const {handleSubmit, getFieldProps, setFieldValue, touched, errors} = useFormik({
        initialValues: {
            titulo: formValuesTitulo ,
            image: '',
            video: formValues,
            evaluacion: formEvaluacion,
        },
        enableReinitialize: true,
        onSubmit: ({titulo, image, video, evaluacion}) => {

            for (let index = 0; index < video.length; index++) {
                const element = video[index];
                
                dispatch(crearVideos(element))

            }

            // image: document.getElementsByName('image').value = ''

            // setimag()

        },
        validationSchema: Yup.object({
            // name: Yup.string()
            //             .max(50, 'Debe de tener 50 caracteres o menos')
            //             .min(3, 'Debe de tener 3 caracteres o más')
            //             .required('Requerido'),
            // lastName: Yup.string()
            //             .max(50, 'Debe de tener 50 caracteres o menos')
            //             .min(3, 'Debe de tener 3 caracteres o más')
            //             .required('Requerido'),
            // date: Yup.string()
            //             .required('Requerido'),
            // email: Yup.string()
            //             .email('La dirección de email no es válida')
            //             .required('Requerido'),
            // role: Yup.string()
            //             .required('Requerido'),
            // password: Yup.string()
            //             .min(8, 'Debe de tener 8 caracteres o más')
            //             .matches(/(?=.*[A-Z])/, "Debe contener como mínimo una letra mayúscula")
            //             .matches(/(?=.*[0-9])/, "Debe contener como mínimo un número")
            //             .required('Requerido'),
            // confirmPassword: Yup.string()
            //             .oneOf([Yup.ref('password')], 'Las contraseñas deben ser iguales')
            //             .required('Requerido')
        })
    })

    useEffect(() => {
        if (paraGuardar?.length === formValues?.length) {
            let arregloVideo = []
            paraGuardar?.map(e => {
                arregloVideo.push({
                    titulo: e?.title,
                    idVideo: e?.id,
                    video: e?.url,
                    createdAt: e?.createdAt,
                    check: false,
                    duration: e?.duration
                })
            })
            dispatch(crearCapacitacion(formValuesTitulo, imag, arregloVideo, formEvaluacion))
            dispatch(toSaveClear())
        }
    }, [paraGuardar])
    

    // Contenido de Capacitación de Video

    const handleChange = (i, e) => {
        let newFormValues = [...formValues];
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
        
    const agregarPregunta = () => {
        setFormEvaluacion([...formEvaluacion, { pregunta: '', respuesta: '' }])
     }
    
    const eliminarPregunta = (i) => {
        console.log(i)
        let newFormValues = [...formEvaluacion];
        newFormValues.splice(i, 1);
        setFormEvaluacion(newFormValues)
    }

    const [first, setfirst] = useState([])

    // const handleVideo = () => {
    //     document.getElementById('fileVideo').click()
    // }

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
                            value={first}
                            onChange={setfirst}
                            labelledBy="Select"
                            hasSelectAll = {false}
                            disableSearch
                        />
                        {/* {touched.role && errors.role && <span style={{color: 'red'}}>{errors.role}</span>} */}
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 form-group">
                        <label className='form-label'>Titulo</label>
                        <input onChange={({target}) => setFormValuesTitulo(target.value)} type="text" placeholder='Titulo de la capacitación' className='form-control' />
                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 col-xxl-3 form-group">
                        <label className='form-label'>Imagen</label>
                        <input accept="image/*" type="file" className='form-control' name='image' onChange={(e) => {
                            // setFieldValue('image', setimag(e.currentTarget.files[0], (e.currentTarget.files[0]) ? setimag(URL.createObjectURL(e.currentTarget.files[0]) || '') : setimag())
                            setimag(e.currentTarget.files[0])
                        }} />
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
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 col-xxl-3 form-group">
                                        <label className='form-label'>Video</label>
                                        <input accept="video/*" id='fileVideo' onChange = {(e) => handleChange(index, e)} type="file" className='form-control' />
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

                {
                    formEvaluacion.map((element, index) => {
                        return (
                            <Fragment key={element + index}>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-6 col-xxl-6 form-group">
                                        <label className='form-label'>Pregunta</label>
                                        <input name='pregunta' value={element.pregunta} onChange = {(e) => handleChangeQuestion(index, e)} type="text" placeholder='Titulo del video' className='form-control' />
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 col-xxl-3 form-group">
                                        <label className='form-label'>Respuesta</label>
                                        <input name='respuesta' value={element.respuesta} onChange = {(e) => handleChangeQuestion(index, e)} type="text" placeholder='Video de la capacitación' className='form-control' />
                                    </div>

                                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3 form-group">
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

                <div className='d-grid gap-2 col-6 mx-auto'>
                    <button type='submit' className = 'btn btn-primary  my-2'>Guardar</button>
                </div>
            </form>
        </div>
    </Sidebar>
  )
}
