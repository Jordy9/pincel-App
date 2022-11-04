import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Pagination } from '../usuarios/Pagination'
import { TableSpreedListInformacionCalificacion } from './TableSpreedListInformacionCalificacion'

export const ModalInformacionCalificacion = ({showModal, setShowModal, calificacion, VideoComponent}) => {

    const handleClose = () => {
        setShowModal(false)
    }

    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        setCurrentPage(0)
    }, [])

    const [title, setTitle] = useState('')

    const calificacionesParaList = calificacion?.filter(calificacion => (title === '') ? calificacion : (calificacion.titulo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,""))) && calificacion)

    const ref = useRef(null)

  return (
    <Modal fullscreen show={showModal} onHide={handleClose}>
    <Modal.Header style={{border: 'none'}} closeButton>
      <Modal.Title><h1>Calificaciones</h1></Modal.Title>
    </Modal.Header>
        <Modal.Body>
            <div className='my-3'>
                <input placeholder='Buscador' type="search" value={title} onChange={({target}) => setTitle(target.value)} className="form-control buscador" />
            </div>
            <div className='table-responsive shadow pt-4 pb-4 px-1' style={{borderTopLeftRadius: '35px', borderBottomLeftRadius: '35px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: '500px'}}>
                <table ref = {ref} className="table borderless">
                    <thead>
                        <tr>
                            <th scope="col">Titulo</th>
                            <th scope="col">Calificación</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableSpreedListInformacionCalificacion calificacion = {calificacionesParaList} currentPage = {currentPage} VideoComponent = {VideoComponent} />
                    </tbody>
                </table>
            </div>

            <div className='mt-3'>
                <Pagination setCurrentPage = {setCurrentPage} usuariosFiltro = {calificacionesParaList} element = {ref?.current} changeNumber = {8} />
            </div>
        </Modal.Body>
    </Modal>
  )
}
