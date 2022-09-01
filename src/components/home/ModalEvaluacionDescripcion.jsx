import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { crearResena } from '../../store/resena/thunk'
import { setClearResena } from '../../store/resena/resenaSlice'

export const ModalEvaluacionDescripcion = ({modalShowDescripcion, setModalShowDescripcion, idUsuarios, setIdUsuarios}) => {

    const dispatch = useDispatch();

    const handleClose = () => {
        setModalShowDescripcion(false)
    }

    const {handleSubmit, getFieldProps} = useFormik({
        initialValues: {
            calificacion: idUsuarios,
            descripcion: ''
        },
        enableReinitialize: true,
        onSubmit: ({calificacion, descripcion}) => {
            dispatch(crearResena(calificacion, descripcion, handleClose))
            setIdUsuarios([])
        },
        validationSchema: Yup.object({
        })
    })

    const handledButton = () => {
        document.getElementById('idButtonDesc').click()
    }

    const [segundos, setSegundos] = useState(0)
    const refSegundosDesc = useRef()

    useEffect(() => {
      refSegundosDesc.current && clearInterval(refSegundosDesc.current)
      refSegundosDesc.current = setInterval(
         () => (modalShowDescripcion) && setSegundos(s => s + 1)
        , 1000)
    }, [modalShowDescripcion])

    let descripci = getFieldProps('descripcion')?.value

    useEffect(() => {
      setSegundos(0)
    }, [descripci])

    useEffect(() => {
        if (segundos === 15) {
          setIdUsuarios([])
          dispatch(setClearResena())
        }
      }, [segundos])

      const arrowBack = () => {
        setModalShowDescripcion(false)
      }

  return (
    <Modal fullscreen show={modalShowDescripcion} onHide={handleClose} centered>
        <Modal.Header style={{border: 'none'}} closeButton>
          {/* <Modal.Title><h1></h1></Modal.Title> */}
          <i id='arrow-back-icon' onClick={arrowBack} style={{fontSize: '30px', cursor: 'pointer'}} className="bi bi-arrow-left-circle-fill"></i>
        </Modal.Header>
        <Modal.Body className='d-flex justify-content-center align-items-center'>
            {/* <div className="row p-4"> */}
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <form onSubmit={handleSubmit}>
                        <div className="shadow p-4 my-auto" style={{borderRadius: '35px'}}>
                            <h3 className='text-center'>¿Algo que nos quieras decir?</h3>
                            <textarea autoFocus type="text" cols={30} rows={10} {...getFieldProps('descripcion')} style = {{resize: 'none'}} placeholder='Descripción de la Reseña' className='form-control' />
                        </div>
                        <div className='d-grid gap-2 col-2 mx-auto'>
                            <button type='submit' className = 'btn btn-primary my-5 btn-lg' style={{height: '50px'}}>Finalizar</button>
                        </div>
                    </form>
                </div>
            {/* </div> */}
        </Modal.Body>
        {/* <Modal.Footer>
            <button type='submit' onClick={handledButton} className='btn btn-primary'>
                Guardar
            </button>

            <button onClick={handleClose} className='btn btn-primary'>
                Cancelar
            </button>
        </Modal.Footer> */}
    </Modal>
  )
}
