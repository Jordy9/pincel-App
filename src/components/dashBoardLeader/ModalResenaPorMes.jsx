import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { showResena0 } from '../../store/resena/resenaSlice';
import { Pagination } from '../usuarios/Pagination';
import { ModalResenaDetalle } from './ModalResenaDetalle';
import { TableSpreedModalPorMes } from './TableSpreedModalPorMes';

export const ModalResenaPorMes = ({showModalResena, setShowModalResena}) => {

    const dispatch = useDispatch();

    const { showResena, resenaFilterSlice } = useSelector(state => state.rs);

    const nuevaResenaSlice = resenaFilterSlice?.filter(resena => (!showResena) ? resena?.estado === true : resena)

    const handleClose = () => {
        setShowModalResena(false)
    }

    const [currentPage, setCurrentPage] = useState(0)

    const [modalShowDetalle, setModalShowDetalle] = useState(false)

    useEffect(() => {
        setCurrentPage(0)
    }, [])

  return (
    <Modal fullscreen show={showModalResena} onHide={handleClose}>
        <Modal.Header style={{border: 'none'}} closeButton>
          <Modal.Title><h1>Reseñas</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row my-3 p-4">
                <div class="form-check text-right">
                <input className="form-check-input" defaultChecked={showResena} onClick={() => dispatch(showResena0(!showResena))} type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label mr-4" for="flexCheckDefault">
                    Mostrar reseñas ocultas
                </label>
                </div>

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
                            <TableSpreedModalPorMes setModalShowDetalle = {setModalShowDetalle} currentPage = {currentPage} resenaFilterSlice = {nuevaResenaSlice} />
                        </tbody>
                    </table>
                </div>
                </div>

                <div className='mt-3'>
                    <Pagination setCurrentPage = {setCurrentPage} usuariosFiltro = {nuevaResenaSlice} />
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
