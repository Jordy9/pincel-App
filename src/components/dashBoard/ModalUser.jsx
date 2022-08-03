import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'
import { useDispatch, useSelector } from 'react-redux'
import { modalClose } from '../../store/auth/authSlice'
import user from '../../heroes/user.webp'
import { ModalPerfilUser } from './ModalUserPerfil'
import { ModalUserResena } from './ModalUserResena'
import { ModalEvaluacionUser } from './ModalEvaluacionUser'

export const ModalUser = () => {

    const dispatch = useDispatch();

    const { modalUser, activeUser } = useSelector(state => state.auth);

    // const { evaluacion } = useSelector(state => state.ev);

    // const evaluacionUser = evaluacion?.filter(evaluacion => evaluacion?.usuario === activeUser?.id)

    // const [completa, mejorar, calificacion] = evaluacionUser;

    const handleClose = () => {
        dispatch(modalClose())
    }

    const [modalShow, setModalShow] = useState(false)

    const [modalShowResena, setModalShowResena] = useState(false)

    const [modalShowEvaluacion, setModalShowEvaluacion] = useState(false)

    const tooltipArray = [
        'Malo',
        'Malo+',
        'Intermedio',
        'Bueno',
        'Excelente',
      ]

    const fillColorArray = [
        '#f17a45',
        '#f17a45',
        '#f19745',
        '#f1b345',
        '#f1d045',
      ]

      useEffect(() => {
        if (modalUser) {
            const span = document.getElementsByClassName('filled-icons')
            span[0]?.removeAttribute("title")
        }
      }, [modalUser])
      
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
                            <div className='d-grid gap-2 col-3 mx-auto'>
                                <button onClick={() => setModalShow(true)} type='button' className = 'btn btn-primary my-2'>Editar</button>
                            </div>
                            <h3 className='text-center'>{activeUser?.name} {activeUser?.lastName}</h3>
                            <div onDoubleClick={() => setModalShowResena(true)} className='text-center' style={{cursor: 'pointer'}}>
                                <Rating  allowHalfIcon readonly ratingValue={activeUser?.calificacion} />
                                <span style={{fontSize: '12px'}}>{activeUser?.cantidad} reseñas</span>
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
                                            <th scope="col">Completa</th>
                                            <th scope="col">En curso</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style={{cursor: 'pointer'}} onDoubleClick={() => setModalShowEvaluacion(true)}>
                                            <td className='d-flex justify-content-center'>
                                                <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                                    <img src={user} className='img-fluid' alt="" />
                                                </div>
                                            </td>
                                            <td>Servicio</td>
                                            <td>-</td>
                                            <td>
                                                <div className="progress my-2">
                                                    <div className="progress-bar" role="progressbar" style={{width: '25%', backgroundColor: 'rgb(89, 7, 211)'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='d-flex justify-content-center'>
                                                <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                                    <img src={user} className='img-fluid' alt="" />
                                                </div>
                                            </td>
                                            <td>Servicio</td>
                                            <td className='text-success'>90</td>
                                            <td>
                                                <i style={{fontSize: '25px'}} className="text-success bi bi-check-circle-fill"></i>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='d-flex justify-content-center'>
                                                <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                                    <img src={user} className='img-fluid' alt="" />
                                                </div>
                                            </td>
                                            <td>Servicio</td>
                                            <td>-</td>
                                            <td>
                                                <div className="progress my-2">
                                                    <div className="progress-bar" role="progressbar" style={{width: '75%', backgroundColor: 'rgb(89, 7, 211)'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">75%</div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <button type='submit' id='idButton' hidden></button>
                </div>
            </div>

        </Modal.Body>

        <ModalPerfilUser modalShow = {modalShow} setModalShow = {setModalShow} />

        <ModalUserResena modalShowResena = {modalShowResena} setModalShowResena = {setModalShowResena} />

        <ModalEvaluacionUser modalShowEvaluacion = {modalShowEvaluacion} setModalShowEvaluacion = {setModalShowEvaluacion} />
    </Modal>
  )
}
