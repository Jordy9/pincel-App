import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { crearResena } from '../../store/resena/thunk'

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
            dispatch(crearResena(calificacion, descripcion))
            handleClose()
            setIdUsuarios([])
        },
        validationSchema: Yup.object({
        })
    })

    const handledButton = () => {
        document.getElementById('idButtonDesc').click()
    }

  return (
    <Modal fullscreen show={modalShowDescripcion} onHide={handleClose}>
        <Modal.Header style={{border: 'none'}} closeButton>
          <Modal.Title><h1>Evaluando a todo el personal seleccionado</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row p-4">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <form onSubmit={handleSubmit}>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 shadow p-4 my-auto" style={{borderRadius: '35px'}}>
                            <h3 className='d-flex justify-content-center'>Reseña general para el equipo</h3>
                            <textarea type="text" cols={30} rows={10} {...getFieldProps('descripcion')} style = {{resize: 'none'}} placeholder='Descripción de la Reseña' className='form-control' />
                        </div>
                        <button type='submit' id='idButtonDesc' hidden></button>
                    </form>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <button type='submit' onClick={handledButton} className='btn btn-primary'>
                Guardar
            </button>

            <button onClick={handleClose} className='btn btn-primary'>
                Cancelar
            </button>
        </Modal.Footer>
    </Modal>
  )
}
