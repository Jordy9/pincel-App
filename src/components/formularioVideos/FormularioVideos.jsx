import React, { Fragment, useState } from 'react'
import { Sidebar } from '../Sidebar'

export const FormularioVideos = () => {

    const [formValues, setFormValues] = useState([{ titulo: '', video: '' }])

    const [formEvaluacion, setFormEvaluacion] = useState([{ pregunta: '', respuesta: '' }])

    // Contenido de Capacitación de Video

    const handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
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

  return (
    <Sidebar>
        <div className='p-4'>
            <h1>Crear capacitación</h1>

            <form className='my-5'>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 form-group">
                        <label className='form-label'>Titulo</label>
                        <input type="text" placeholder='Titulo de la capacitación' className='form-control' />
                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 col-xxl-3 form-group">
                        <label className='form-label'>Imagen</label>
                        <input type="text" placeholder='Imagen de la capacitación' className='form-control' />
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
                                        <input name='video' value={element.video} onChange = {(e) => handleChange(index, e)} type="text" placeholder='Video de la capacitación' className='form-control' />
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
                                        <input name='titulo' value={element.pregunta} onChange = {(e) => handleChangeQuestion(index, e)} type="text" placeholder='Titulo del video' className='form-control' />
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 col-xxl-3 form-group">
                                        <label className='form-label'>Respuesta</label>
                                        <input name='video' value={element.respuesta} onChange = {(e) => handleChangeQuestion(index, e)} type="text" placeholder='Video de la capacitación' className='form-control' />
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
