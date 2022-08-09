import React from 'react'

export const CalificacionEvaluacion = ({calificacionShow}) => {
  return (
    <div className='p-4 shadow mt-5' style={{borderRadius: '35px'}}>
        <h1 className='text-center'>Calificación</h1>
        <h5 className='text-center'>Tu calificación en esta evaluación es {calificacionShow} de 100</h5>
    </div>
  )
}
