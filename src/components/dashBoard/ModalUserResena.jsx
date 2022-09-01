import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { ModalResenaDetalle } from './ModalResenaDetalle'
import { TableSpreedListResena } from './TableSpreedListResena'

export const ModalUserResena = ({modalShowResena, setModalShowResena}) => {

  const handleClose = () => {
    setModalShowResena(false)
  }

  const [modalShowDetalle, setModalShowDetalle] = useState(false)

  return (
    <Modal fullscreen show={modalShowResena} onHide={handleClose}>
        <Modal.Header style={{border: 'none'}} closeButton>
          <Modal.Title><h1>Reseñas</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row my-3 p-4">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 my-auto" style={{borderRadius: '35px'}}>
                <div className='table-responsive shadow p-4' style={{borderTopLeftRadius: '35px', borderBottomLeftRadius: '35px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: '500px'}}>
                    <table className="table borderless">
                        <thead>
                            <tr>
                                <th scope="col">Calificación</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Inhabilitar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableSpreedListResena setModalShowDetalle = {setModalShowDetalle} />
                        </tbody>
                    </table>
                </div>
              </div>
            </div>

        </Modal.Body>

        {
          (modalShowDetalle)
            &&
        <ModalResenaDetalle modalShowDetalle = {modalShowDetalle} setModalShowDetalle = {setModalShowDetalle} />
        }

    </Modal>
  )
}
