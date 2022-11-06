import React, { useEffect } from 'react'
import { useMemo } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { eliminarEnEvaluacion } from '../../store/enEvaluacion/thunk';
import { actualizarEvaluacion, crearEvaluacion } from '../../store/evaluacion/thunk';
import { NavbarEvaluacion } from './NavbarEvaluacion';

export const EvaluacionPage = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const { capacitacionActiva } = useSelector(state => state.cp);

    
    const { evaluacion } = useSelector(state => state.ev);
    
    const { uid } = useSelector(state => state.auth);

    const { enEvaluacion } = useSelector(state => state.enE);

    const enEva = enEvaluacion?.find(ev => ev?.idUsuario === uid)

    const evaluacionUserComplete = evaluacion?.filter(evaluacion => evaluacion?.idCapacitacion === capacitacionActiva?._id && evaluacion?.idUsuario === uid)

    const [formValues, setFormValues] = useState([{evaluacion: null, respuesta: '', correcta: ''}])

    const funcionarreg = (i, evaluacion, a, e) => {
        let newArre = [...formValues]
        newArre[i] = {evaluacion, respuesta: a, correcta: e}
        setFormValues(newArre)
    }

    const [changeCountResponse, setChangeCountResponse] = useState(1)

    const intentosPermitidos = capacitacionActiva?.usuariosEvaluacion?.filter(capacitacion => capacitacion?.id === uid)

    const terminar = (intentos) => {
        const calificacion = formValues?.filter(calificacion => calificacion?.correcta === 'true')
        const calificacionFinal = (calificacion?.length / formValues?.length) * 100

        if (capacitacionActiva?.intentos === Number(intentosPermitidos[0]?.intentos) && evaluacionUserComplete?.length === 0) {
            dispatch(crearEvaluacion(formValues, calificacionFinal?.toFixed()))
            dispatch(eliminarEnEvaluacion(enEva?._id))
        } else {
            dispatch(actualizarEvaluacion(formValues, calificacionFinal?.toFixed(), evaluacionUserComplete[0]?._id))
            dispatch(eliminarEnEvaluacion(enEva?._id))
        }

        navigate(`/capacitacion/${capacitacionActiva?._id}`)
        
    }

    const siguientePregunta = () => {
        if (changeCountResponse <= capacitacionActiva?.preguntas?.length) {
            setChangeCountResponse(changeCountResponse + 1)
        }
    }

    const anteriorPregunta = () => {
        if (changeCountResponse > 1) {
            setChangeCountResponse(changeCountResponse - 1)
        }
    }

    const seleccionados = formValues?.filter(form => form?.evaluacion !== null)

    // let PreguntaAleatoria = useMemo(() => capacitacionActiva?.preguntas?.map(pregunta => pregunta).sort(() => Math.random() - 0.5), [])

    let PreguntaAleatoria = capacitacionActiva?.preguntas

    let arregloRespuestasAleatorias = useMemo(() => PreguntaAleatoria[changeCountResponse - 1].respuesta?.map(respuesta => respuesta)?.sort(() => Math.random() - 0.5), [changeCountResponse - 1])

    useEffect(() => {
      if (Number(intentosPermitidos[0]?.intentos) === 0) {
        navigate(`/capacitacion/${capacitacionActiva?._id}`)
      }
    }, [intentosPermitidos])
    
  return (
    <>
        <div className="row my-5 p-4">
            <>
                <NavbarEvaluacion direction = {'top'} />
                <h4>{changeCountResponse}/{capacitacionActiva?.preguntas?.length}</h4>

                <div className='p-4 text-black'>
                    <h3>{PreguntaAleatoria[changeCountResponse - 1]?.pregunta}</h3>
                    <div className="row p-4 my-5">
                        {
                            arregloRespuestasAleatorias?.map((evaluacionResp, index) => {
                                return (
                                    <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 my-3" style={{maxHeight: '150px', overflowY: 'auto'}}>
                                        <div className="form-check">
                                            <input checked = {(formValues[changeCountResponse - 1]?.respuesta === evaluacionResp?.respuesta) && true} className="form-check-input" type="radio" onClick={() => funcionarreg(changeCountResponse - 1, capacitacionActiva?.preguntas[changeCountResponse - 1], evaluacionResp?.respuesta, evaluacionResp?.accion )} id="exampleRadios2" value="option2" />
                                            <label className="form-check-label" style={{fontSize: '25px'}}>{evaluacionResp?.respuesta}</label>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        </div>

        <NavbarEvaluacion 
            direction = {'bottom'} 
            anteriorPregunta = {anteriorPregunta}
            capacitacionActiva = {capacitacionActiva}
            changeCountResponse = {changeCountResponse}
            changeEvaluacionCalificacion = {null}
            formValues = {formValues}
            intentosPermitidos = {intentosPermitidos}
            seleccionados = {seleccionados}
            siguientePregunta = {siguientePregunta}
            terminar = {terminar}
            intentos = {Number(intentosPermitidos[0]?.intentos)}
         />
    </>
  )
}

