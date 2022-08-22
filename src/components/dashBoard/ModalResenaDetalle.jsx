import React from 'react'
import { Modal } from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'
import { useDispatch, useSelector } from 'react-redux'
import { eliminarResena } from '../../store/resena/thunk'
import Swal from 'sweetalert2'

export const ModalResenaDetalle = ({modalShowDetalle, setModalShowDetalle}) => {

    const dispatch = useDispatch();

    const { activeResena } = useSelector(state => state.rs);

    const handleClose = () => {
        setModalShowDetalle(false)
    }

    const handledButton = () => {
        
        Swal.fire({
            title: '¿Esta seguro que desea eliminar esta reseña?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('idButton').click()
                dispatch(eliminarResena(activeResena?.id))
                setModalShowDetalle(false)
            }
          })
    }

  return (
    <Modal fullscreen show={modalShowDetalle} onHide={handleClose}>
        <Modal.Header style={{border: 'none'}} closeButton>
          <Modal.Title><h1>Reseña</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row p-4">
                <div className = "shadow p-4" style={{borderRadius: '35px'}}>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 my-2">
                        <h4 className='d-flex justify-content-center'>Calificación</h4>
                        <span className='d-flex justify-content-center'><Rating size={20} readonly ratingValue={activeResena?.calificacion} /></span>
                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 my-2">
                        <label className='d-flex justify-content-center'>Reseña general para el equipo</label>
                        <textarea readOnly type="text" cols={30} rows={10} value = {activeResena.descripcion} style = {{resize: 'none'}} placeholder='Descripción de la Reseña' className='form-control' />
                    </div>
                </div>
            </div>

        </Modal.Body>
        <Modal.Footer>
            <button type='button' onClick={handledButton} className='btn btn-danger'>
                Eliminar definitivamente
            </button>
        </Modal.Footer>
    </Modal>
  )
}
