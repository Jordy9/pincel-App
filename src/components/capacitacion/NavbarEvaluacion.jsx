import React from 'react'
import { Navbar } from 'react-bootstrap'

export const NavbarEvaluacion = ({direction, changeCountResponse, changeEvaluacionCalificacion, anteriorPregunta, formValues, capacitacionActiva, seleccionados, intentosPermitidos, siguientePregunta, terminar, intentos}) => {
  return (
    <Navbar style={{backgroundColor: 'rgb(10, 25, 45)'}} variant='dark' expand="lg" fixed={direction}>
        {
            (direction === 'top')
                ?
            <Navbar.Brand className='ml-5'>Te capacitamos para el trabajo</Navbar.Brand>
                :
            <div className='ml-auto mr-5'>
                {
                (changeCountResponse > 1 && !changeEvaluacionCalificacion)
                    &&
                <button onClick={anteriorPregunta} className='btn btn-primary mx-2'>Anterior</button>
                }

                {
                    ((changeCountResponse === capacitacionActiva?.preguntas?.length && formValues?.length === changeCountResponse) || Number(intentosPermitidos[0]?.intentos) === 0)
                        ?
                    (Number(Number(intentosPermitidos[0]?.intentos)) !== 0 && seleccionados?.length !== 0 && !changeEvaluacionCalificacion)
                        &&
                    <button onClick={() => terminar(intentos)} className='btn btn-primary mx-2'>Terminar</button>
                        :
                    <button hidden = {(changeEvaluacionCalificacion || changeCountResponse === capacitacionActiva?.preguntas?.length)} onClick={siguientePregunta} className='btn btn-primary mx-2'>Siguiente</button>
                }
            </div>
        }
    </Navbar>
  )
}
