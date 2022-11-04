import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'

export const CalificacionEvaluacion = ({intentos, calificacionShow, setChangeCountResponse, setChangeEvaluacionCalificacion, evaluacionActiva, setFormValues, setModalShowEvaluacion}) => {

  const handledIntento = () => {
    Swal.fire({
      title: 'Si toma la evaluación de nuevo, solo se tomará en cuenta su nueva calificación',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No por ahora',
      confirmButtonColor: 'rgb(0, 197, 0)',
      cancelButtonColor: 'rgb(0, 197, 0)',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        if (intentos !== 0) {
          setChangeCountResponse(1)
          setChangeEvaluacionCalificacion(false)
          setFormValues([{evaluacion: null, respuesta: '', correcta: ''}])
        } else {
          setModalShowEvaluacion(false)
          setChangeEvaluacionCalificacion(false)
        }
      }
    })
  }

  const [segundos, setSegundos] = useState(0)
  const refSegundos = useRef()

  useEffect(() => {
    refSegundos.current && clearInterval(refSegundos.current)
    refSegundos.current = setInterval(
        () => (segundos < 3 && intentos === 0) && setSegundos(s => s + 1)
      , 1000)
  }, [segundos, intentos])

  useEffect(() => {
    if (segundos === 2) {
      setModalShowEvaluacion(false)
    }
  }, [segundos, setModalShowEvaluacion])

  return (
    <div className='p-4 shadow mt-5' style={{borderRadius: '35px'}}>
        <h1 className='text-center'>Calificación</h1>
        <h5 className='text-center'>Tu calificación en esta evaluación es {calificacionShow?.toFixed()} de 100</h5>

        {/* {
          (intentos === 0)
            &&
          <div className='table-responsive' style={{borderTopLeftRadius: '35px', borderBottomLeftRadius: '35px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: 'auto'}}>
            <h4 className='text-center mt-2'>Questionario</h4>
            <table className="table borderless">
              <thead>
                <tr>
                  <th className='d-flex justify-content-start' scope="col">Número pregunta</th>
                  <th scope="col">Pregunta</th>
                  <th scope="col">Respuesta seleccionada</th>
                  <th scope="col">Respuesta correcta</th>
                </tr>
              </thead>
              <tbody>
                {
                    evaluacionActiva?.map((evaluacion, index) => {
                    return (
                      <>
                        <tr>
                            <td className='d-flex justify-content-start'>
                              <button className='btn btn-primary'>{index + 1}</button>
                            </td>
                            <td className='no-elipsis'>{evaluacion?.evaluacion?.pregunta}</td>
                            <td className='no-elipsis'>{evaluacion?.respuesta}</td>
                            <td className='no-elipsis'>{evaluacion?.evaluacion?.respuesta[0]?.respuesta}</td>
                            <td>
                              {
                                (evaluacion?.correcta === 'true')
                                  ?
                                <i style={{fontSize: '25px'}} className="text-success bi bi-check-circle-fill"></i>
                                  :
                                <i style={{fontSize: '25px'}} className="text-danger bi bi-x-circle-fill"></i>
                              }
                            </td>
                        </tr>
                      </>
                    )
                    }) 
                }
              </tbody>
            </table>
          </div>
        } */}

        {
          (intentos !== 0)
            &&
          <div className='text-center'>
            <button disabled = {(intentos === 0)} onClick={handledIntento} className='btn btn-primary'>Volver a intentar</button>
          </div>
        }

    </div>
  )
}
