import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'
import { useDispatch, useSelector } from 'react-redux'
import { modalClose } from '../../store/auth/authSlice'
import user from '../../heroes/user.webp'
import { ModalUserResena } from './ModalUserResena'
import { TableModalUserSpreed } from './TableModalUserSpreed'
import { onDoubleTap } from '../../helper/onDoubleTap'
import { useRef } from 'react'
import { Pagination } from '../usuarios/Pagination'

export const ModalUser = () => {

    const dispatch = useDispatch();

    const { modalUser, activeUser } = useSelector(state => state.auth);

    const { capacitacion } = useSelector(state => state.cp);

    const { evaluacionFilterSlice } = useSelector(state => state.ev);

    const handleClose = () => {
        dispatch(modalClose())
    }

    const [modalShow, setModalShow] = useState(false)

    const [modalShowResena, setModalShowResena] = useState(false)

    useEffect(() => {
        if (modalUser) {
            const span = document.getElementsByClassName('filled-icons')
            span[0]?.removeAttribute("title")
        }
    }, [modalUser])

    const onShow = () => {
        setModalShowResena(true)
    }

    let capacitacionTOList = []
    
    capacitacionTOList = capacitacion?.filter(evaluacion => evaluacion?.publicar === true && evaluacion?.team?.some(team => team?.value === activeUser?.team || team?.value === activeUser?.id || activeUser?.role === 'Administrador'))

    const [title, setTitle] = useState('')

    const capacitacionToShow = capacitacionTOList?.filter(capacitacion => (title === '') ? capacitacion : (capacitacion.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,""))) && capacitacion)

    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
      setCurrentPage(0)
    }, [])

    const ref = useRef(null)

  return (
    <Modal fullscreen show={modalUser} onHide={handleClose}>
        <Modal.Header style={{border: 'none'}} closeButton>
          <Modal.Title><h1>Ver usuario</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <div className="row">
                        <div className="col-col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                            <div className='d-flex mx-auto' style={{width: '250px', height: '250px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                <img src={activeUser?.urlImage || user} className='img-fluid' alt="" />
                            </div>
                            {/* <div className='d-grid gap-2 col-3 mx-auto'>
                                <button onClick={() => setModalShow(true)} type='button' className = 'btn btn-primary my-2'>Editar</button>
                            </div> */}
                            <h3 className='text-center my-1'>{activeUser?.name} {activeUser?.lastName}</h3>
                            <div onTouchStart={(e) => onDoubleTap(e, onShow)} onDoubleClick={onShow} className='text-center' style={{cursor: 'pointer'}}>
                                <Rating allowHalfIcon readonly ratingValue={activeUser?.calificacion} />
                                <span style={{fontSize: '15px'}}>{activeUser?.cantidad} reseñas</span>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 my-auto" style={{borderRadius: '35px'}}>
                            <div className='table-responsive shadow pt-4 pb-4 px-1' style={{borderTopLeftRadius: '35px', borderBottomLeftRadius: '35px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: '500px'}}>
                                <div className='px-4'>
                                    <input placeholder='Buscador' type="search" value={title} onChange={({target}) => setTitle(target.value)} className="form-control buscador" />
                                </div>
                                <h4 className='text-center'>Capacitaciones</h4>
                                <table ref = {ref} className="table borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">Imagen</th>
                                            <th scope="col">Titulo</th>
                                            <th scope="col">Progreso</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <TableModalUserSpreed capacitacionTOList = {capacitacionToShow} currentPage = {currentPage} />
                                    </tbody>
                                </table>
                            </div>

                            <div className='mt-3'>
                                <Pagination setCurrentPage = {setCurrentPage} usuariosFiltro = {capacitacionToShow} changeNumber = {8} element = {ref?.current} />
                            </div>
                        </div>
                    </div>
                    <button type='submit' id='idButton' hidden></button>
                </div>
            </div>

        </Modal.Body>

        {/* <ModalPerfilUser modalShow = {modalShow} setModalShow = {setModalShow} /> */}

        <ModalUserResena modalShowResena = {modalShowResena} setModalShowResena = {setModalShowResena} />
    </Modal>
  )
}
