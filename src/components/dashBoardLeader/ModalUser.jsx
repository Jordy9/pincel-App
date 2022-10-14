import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'
import { useDispatch, useSelector } from 'react-redux'
import { modalClose } from '../../store/auth/authSlice'
import user from '../../heroes/user.webp'
import { ModalPerfilUser } from './ModalUserPerfil'
import { ModalUserResena } from './ModalUserResena'
import { TableModalUserSpreed } from './TableModalUserSpreed'
import { onDoubleTap } from '../../helper/onDoubleTap'

export const ModalUser = () => {

    const dispatch = useDispatch();

    const { modalUser, activeUser } = useSelector(state => state.auth);

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
      
  return (
    <Modal fullscreen show={modalUser} onHide={handleClose}>
        <Modal.Header style={{border: 'none'}} closeButton>
          <Modal.Title><h1>Ver o actualizar usuario</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row p-4">
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
                            <div className='table-responsive shadow p-4' style={{borderTopLeftRadius: '35px', borderBottomLeftRadius: '35px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: '500px'}}>
                                <h4 className='text-center'>Capacitaciones</h4>
                                <table className="table borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">Imagen</th>
                                            <th scope="col">Titulo</th>
                                            <th scope="col">Progreso</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <TableModalUserSpreed />
                                    </tbody>
                                </table>
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
