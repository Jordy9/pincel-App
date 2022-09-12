import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { actualizarEquipo, eliminarEquipo } from '../../store/equipo/thunk'

export const ModalEdit = ({sendProps, modalEdit, setModalEdit}) => {

    const dispatch = useDispatch();

    const handleClose = () => {
        setModalEdit(false)
    }

    const [updateEquipo, setUpdateEquipo] = useState()

    useEffect(() => {
        setUpdateEquipo(sendProps?.name)
    }, [sendProps])

    const handledDelete = () => {
        Swal.fire({
          title: '¿Esta seguro que desea eliminar este equipo?',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Eliminar'
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(eliminarEquipo(sendProps))
          }
        })
      }
    
  return (
    <Modal size='md' backdrop = 'static' show={modalEdit} onHide={handleClose}>
      <Modal.Header style={{border: 'none'}} closeButton>
        <Modal.Title><h1>Actualizar equipo</h1></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
            <div className='col-12 mx-auto mt-5'>
                <input value={updateEquipo} onChange = {({target}) => setUpdateEquipo(target.value)} type="text" className='form-control'/>

                <div className='text-center mt-5'>
                    <button onClick={() => dispatch(actualizarEquipo(sendProps, updateEquipo))} className='btn btn-primary btn-lg mx-1'>Guardar</button>
                    <button onClick={handledDelete} className='btn btn-primary btn-lg mx-1'>Eliminar</button>
                </div>
            </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
