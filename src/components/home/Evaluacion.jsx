import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { crearAResena } from '../../store/resena/thunk';
import { ModalEvaluacion } from './ModalEvaluacion'

export const Evaluacion = () => {

    const dispatch = useDispatch();

    const { usuarios } = useSelector(state => state.auth);

    const { AResena } = useSelector(state => state.rs);
    
    const [modalShow, setModalShow] = useState(false)

    const modalOpen = () => {
        setModalShow(true)
    }

  return (
    <div style={{height: '100vh', backgroundImage: 'url("https://cdn.pixabay.com/photo/2020/05/21/11/42/hair-salon-5200393_960_720.jpg")', backgroundPosition: 'center center', backgroundSize: 'cover', minHeight: '100vh'}}>
        <h1 className={`${(AResena?.length !== 0) && 'mt-3'} text-white p-4`}>Seleccione el personal que le atendió el día de hoy</h1>
        <div className="row p-4 my-2">
            {
                usuarios?.filter(usuarios => usuarios?.role === 'Usuario')?.map(usuario => {
                    return (
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-2 col-xl-2 col-col-xxl-2">
                            <div onClick={() => dispatch(crearAResena(usuario))} className='bg-transparent d-flex flex-column' style={{width: '100%', height: 'auto', borderRadius: '10px'}}>
                                {
                                    (AResena?.includes(usuario))
                                        &&
                                    <i style={{fontSize: '35px', position: 'absolute', zIndex: 1045, top: 0, right: 20}} className="text-primary bi bi-check-circle-fill"></i>
                                }
                                <img src={usuario?.urlImage || "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg"} className='img-fluid' style={{cursor: 'pointer', height: '150px', objectFit: 'cover', borderRadius: '20px', opacity: (AResena?.includes(usuario)) && 0.5}} alt="" />
                                <div className='p-2'>
                                    <h5 className='text-white text-center'>{usuario?.name}</h5>
                                    {/* <p style={{fontSize: '15px'}} className='text-white text-center'>{usuario?.role}</p> */}
                                </div>
                            </div>
                        </div>
                    )
                })
            }

            <div className='d-flex justify-content-center'>
                <button hidden = {(AResena?.length === 0)} onClick={modalOpen} className='btn btn-primary form-control' style={{position: 'fixed', zIndex: 1045, top: 0}}>Evaluar</button>
            </div>

        </div>

        {
            (modalShow)
                &&
            <ModalEvaluacion modalShow = {modalShow} setModalShow = {setModalShow} resena = {AResena} />
        }
    </div>
  )
}
