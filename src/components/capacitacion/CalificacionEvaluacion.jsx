import React from 'react'
import Swal from 'sweetalert2'

export const CalificacionEvaluacion = ({intentos, calificacionShow, setChangeCountResponse, setChangeEvaluacionCalificacion, evaluacionActiva, setFormValues}) => {

  const handledIntento = () => {
    Swal.fire({
      title: 'Si toma la evaluación de nuevo, solo se tomará en cuenta su nueva calificación',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'rgb(89, 7, 211)',
      cancelButtonColor: 'rgb(89, 7, 211)',
      confirmButtonText: 'Intentar'
    }).then((result) => {
      if (result.isConfirmed) {
        setChangeCountResponse(1)
        setChangeEvaluacionCalificacion(false)
        setFormValues([{evaluacion: null, respuesta: '', correcta: ''}])
      }
    })
  }

  return (
    <div className='p-4 shadow mt-5' style={{borderRadius: '35px'}}>
        <h1 className='text-center'>Calificación</h1>
        <h5 className='text-center'>Tu calificación en esta evaluación es {calificacionShow} de 100</h5>

        {
          (intentos === 0)
            &&
          <div className='table-responsive' style={{borderTopLeftRadius: '35px', borderBottomLeftRadius: '35px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: 'auto'}}>
            <h4 className='text-center mt-2'>Questionario</h4>
            <table className="table borderless">
              <thead>
                <tr>
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
                        <button className='btn btn-primary my-1 mx-1' style={{position: 'absolute'}}>{index + 1}</button>
                        <tr>
                            <td>{evaluacion?.evaluacion?.pregunta}</td>
                            <td>{evaluacion?.respuesta}</td>
                            <td>{evaluacion?.evaluacion?.respuesta1}</td>
                            <td>
                              {
                                (evaluacion?.correcta)
                                  ?
                                <i style={{fontSize: '25px'}} className="text-success bi bi-check-circle-fill"></i>
                                  :
                                <i style={{fontSize: '25px'}} className="text-danger bi bi-x-octagon"></i>
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
        }

        {
          (intentos !== 0)
            &&
          <div className='text-center'>
            <button onClick={handledIntento} className='btn btn-primary'>Volver a intentar</button>
          </div>
        }

    </div>
  )
}
