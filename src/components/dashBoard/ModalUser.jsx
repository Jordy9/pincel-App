import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'
import { useDispatch, useSelector } from 'react-redux'
import { modalClose } from '../../store/auth/authSlice'
import user from '../../heroes/user.webp'
import { iniciarActualizacion } from '../../store/auth/thunk'
import { ModalPerfilUser } from './ModalUserPerfil'

export const ModalUser = () => {

    const dispatch = useDispatch();

    const { modalUser, activeUser } = useSelector(state => state.auth);

    const { evaluacion } = useSelector(state => state.ev);

    const evaluacionUser = evaluacion.filter(evaluacion => evaluacion.usuario === activeUser?.id)

    const [completa, mejorar, calificacion] = evaluacionUser;

    const [rating, setRating] = useState(90) // initial rating value

    const handleClose = () => {
        dispatch(modalClose())
    }

    const [modalShow, setModalShow] = useState(false)

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
                            <div className='text-center'>
                                <Rating readonly ratingValue={rating} />
                                <span style={{fontSize: '12px'}}>10 reseñas</span>
                            </div>
                        </div>


                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 my-auto" style={{borderRadius: '35px'}}>
                            <div className='table-responsive shadow p-4' style={{borderTopLeftRadius: '35px', borderBottomLeftRadius: '35px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: '300px'}}>
                                <h4 className='text-center'>Capacitaciones</h4>
                                <table className="table borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col">Imagen</th>
                                            <th scope="col">Titulo</th>
                                            <th scope="col">Completa</th>
                                            <th scope="col">Por mejorar</th>
                                            <th scope="col">En curso</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='d-flex justify-content-center'>
                                                <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                                    <img src={user} className='img-fluid' alt="" />
                                                </div>
                                            </td>
                                            <td>Servicio</td>
                                            <td>No</td>
                                            <td>No</td>
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
                                            <td>Si</td>
                                            <td>No</td>
                                            <td>
                                                {/* <div className="progress my-2">
                                                    <div className="progress-bar" role="progressbar" style={{width: '25%', backgroundColor: 'rgb(89, 7, 211)'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                                                </div> */}
                                                No
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='d-flex justify-content-center'>
                                                <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                                    <img src={user} className='img-fluid' alt="" />
                                                </div>
                                            </td>
                                            <td>Servicio</td>
                                            <td>No</td>
                                            <td>No</td>
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

            <div className="row my-3 p-4">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12" style={{borderRadius: '35px'}}>
                    <div className="row">
                        <div className="col-2">
                            <h1 className='text-center'>Reseñas</h1>
                        </div>
                    </div>

                    <div className="row d-flex justify-content-center">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-3 shadow p-4 mx-2" style={{borderRadius: '35px', height: '240px'}}>
                            <div className='text-center'>
                                <Rating size={20} readonly ratingValue={rating} />
                            </div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero iusto dolore eligendi ab quam nobis aliquam quae possimus officia, error dolorem assumenda sed eius. Mollitia veniam reiciendis aperiam reprehenderit officia?
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5 shadow p-4 mx-2" style={{borderRadius: '35px', height: '240px'}}>
                            <div className='text-center'>
                                <Rating size={20} readonly ratingValue={rating} />
                            </div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero iusto dolore eligendi ab quam nobis aliquam quae possimus officia, error dolorem assumenda sed eius. Mollitia veniam reiciendis aperiam reprehenderit officia?
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-3 shadow p-4 mx-2" style={{borderRadius: '35px', height: '240px'}}>
                            <div className='text-center'>
                                <Rating size={20} readonly ratingValue={rating} />
                            </div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero iusto dolore eligendi ab quam nobis aliquam quae possimus officia, error dolorem assumenda sed eius. Mollitia veniam reiciendis aperiam reprehenderit officia?
                        </div>
                    </div>

                </div>
            </div>

        </Modal.Body>

        <ModalPerfilUser modalShow = {modalShow} setModalShow = {setModalShow} />
    </Modal>
  )
}
