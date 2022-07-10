import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'

export const ModalUser = ({show, setShow}) => {
    const [rating, setRating] = useState(90) // initial rating value

    // Catch Rating value
    // const handleRating = (rate) => {
    //     setRating(rate)
    //     // other logic
    // }

    const handleClose = () => {
        setShow(false)
    }

  return (
    <Modal fullscreen show={show} onHide={handleClose}>
        <Modal.Header style={{border: 'none'}} closeButton>
          <Modal.Title><h1>Ver o actualizar usuario</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row p-4">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <div className="row">
                        <div className="col-col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                            <div className='d-flex mx-auto' style={{width: '250px', height: '250px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                <img src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg" className='img-fluid' alt="" />
                            </div>
                            <h3 className='text-center my-2'>Maria Rodriguez</h3>
                            <div className='text-center'>
                                <Rating readonly ratingValue={rating} />
                                <span style={{fontSize: '12px'}}>10 reseñas</span>
                            </div>
                        </div>


                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 shadow p-4 my-auto" style={{borderRadius: '35px'}}>
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                    <label>Nombre</label>
                                    <input type="text" placeholder='Nombre' className='form-control' />
                                </div>

                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                    <label>Apellido</label>
                                    <input type="text" placeholder='Apellido' className='form-control' />
                                </div>

                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                    <label>Correo electrónico</label>
                                    <input type="text" placeholder='Correo electrónico' className='form-control' />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                    <label>Fecha de nacimiento</label>
                                    <input type="text" placeholder='Nombre' className='form-control' />
                                </div>

                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                    <label>Sexo</label>
                                    <input type="text" placeholder='Nombre' className='form-control' />
                                </div>

                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                    <label>Capacitaciones realizadas</label>
                                    <input type="text" placeholder='Apellido' className='form-control' />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                    <label>Capacitaciones por mejorar</label>
                                    <input type="text" placeholder='Correo electrónico' className='form-control' />
                                </div>

                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                    <label>Promedio</label>
                                    <input type="text" placeholder='Nombre' className='form-control' />
                                </div>

                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                    <label>Indice</label>
                                    <input type="text" placeholder='Apellido' className='form-control' />
                                </div>
                            </div>

                            <div className="row d-flex justify-content-center">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>Evaluaciones tomadas</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>

                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                                    <button className='btn btn-primary form-control'>Permitir otro intento</button>
                                </div>
                            </div>
                        </div>
                    </div>
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

                        {/* <div className="col-3 shadow p-4 mx-2" style={{borderRadius: '35px'}}>
                            <div className='text-center'>
                                <Rating size={20} readonly ratingValue={rating} />
                            </div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero iusto dolore eligendi ab quam nobis aliquam quae possimus officia, error dolorem assumenda sed eius. Mollitia veniam reiciendis aperiam reprehenderit officia?
                        </div> */}
                        
                        {/* <div className="col-3 shadow p-4 mx-2" style={{borderRadius: '35px'}}>
                            <div className='text-center'>
                                <Rating size={20} readonly ratingValue={rating} />
                            </div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero iusto dolore eligendi ab quam nobis aliquam quae possimus officia, error dolorem assumenda sed eius. Mollitia veniam reiciendis aperiam reprehenderit officia?
                        </div> */}
                    </div>

                </div>
            </div>

        </Modal.Body>
        <Modal.Footer>
            <button className='btn btn-primary'>
                Guardar
            </button>

            <button className='btn btn-primary'>
                Cancelar
            </button>
        </Modal.Footer>
      </Modal>
  )
}
