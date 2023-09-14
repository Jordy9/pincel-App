import React from 'react'
import { Modal } from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'
import { useDispatch, useSelector } from 'react-redux'
import { eliminarResena } from '../../store/resena/thunk'
import Swal from 'sweetalert2'
import Slider from 'react-slick'
import userImg from '../../heroes/user.webp'

export const ModalResenaDetalle = ({modalShowDetalle, setModalShowDetalle}) => {

    const dispatch = useDispatch();

    const { activeResena } = useSelector(state => state.rs);
    
    const { usuarios } = useSelector(state => state.auth);

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
                dispatch(eliminarResena(activeResena?.id))
                setModalShowDetalle(false)
            }
          })
    }

    let filtroPersonas = []

    activeResena?.usuarios?.map(e => (
        filtroPersonas.push({...usuarios?.filter(usuarios => usuarios?.id === e?.id), calificacion: e.calificacion})
    ))

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 10,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              initialSlide: 0,
              dots: false
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false
            }
          }
        ]
      };

  return (
    <Modal fullscreen show={modalShowDetalle} onHide={handleClose}>
        <Modal.Header style={{border: 'none'}} closeButton>
          <Modal.Title><h1>Reseña</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row p-4">
            <Slider {...settings}>
                {
                    filtroPersonas?.map(e => {
                        return (
                            <>
                                <div className='d-flex justify-content-center'>
                                    <img src={e[0]?.urlImage ?? userImg} style={{height: 'auto', width: 'auto', maxHeight: '90px', maxWidth: '90px', borderRadius: '50%'}} alt="" />
                                </div>
                                
                                <div className='text-center'>
                                    <h5>{e[0]?.name}</h5>
                                    <Rating className='mx-auto' size={20} readonly ratingValue={e?.calificacion} />
                                </div>
                            </>
                        )
                    })
                }
            </Slider>
                <div className = "shadow p-2" style={{borderRadius: '35px'}}>
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
