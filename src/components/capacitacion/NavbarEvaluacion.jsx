import React from 'react'
import { Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { eliminarEnEvaluacion } from '../../store/enEvaluacion/thunk'

export const NavbarEvaluacion = ({direction, changeCountResponse, changeEvaluacionCalificacion, anteriorPregunta, formValues, capacitacionActiva, seleccionados, intentosPermitidos, siguientePregunta, terminar, intentos, evaluacionId}) => {

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const goBack = () => {
        Swal.fire({
            title: '¿Está seguro que desea abandonar la evaluación?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'No por ahora',
            confirmButtonColor: 'rgb(0, 197, 0)',
            cancelButtonColor: 'rgb(0, 197, 0)',
            confirmButtonText: 'Si'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(eliminarEnEvaluacion(evaluacionId))
                navigate(`/capacitacion/${capacitacionActiva?._id}`)
            }
          })
    }

  return (
    <Navbar style={{backgroundColor: 'rgb(10, 25, 45)'}} variant='dark' expand="lg" fixed={direction}>
        {
            (direction === 'top')
                ?
            <>
                <i onClick={goBack} style={{fontSize: '30px', cursor: 'pointer'}} className="bi bi-arrow-left-circle-fill text-white mx-3"></i>
                <Navbar.Brand>Te capacitamos para el trabajo</Navbar.Brand>
            </>
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
