import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { comenzarResena, setClearResena } from '../../store/resena/resenaSlice';
import { crearAResena } from '../../store/resena/thunk';
import { ModalEvaluacion } from './ModalEvaluacion'
import user from '../../heroes/user.webp'

export const Evaluacion = () => {

    const dispatch = useDispatch();

    const { usuarios } = useSelector(state => state.auth);

    const { AResena, comenzar } = useSelector(state => state.rs);
    
    const [modalShow, setModalShow] = useState(false)

    const modalOpen = () => {
        setModalShow(true)
    }

    const [segundos, setSegundos] = useState(0)
    const refSegundos = useRef()

    useEffect(() => {
      refSegundos.current && clearInterval(refSegundos.current)
      refSegundos.current = setInterval(
         () => (!comenzar && !modalShow) && setSegundos(s => s + 1)
        , 1000)
    }, [comenzar, modalShow])

    useEffect(() => {
      setSegundos(0)
    }, [AResena])

    useEffect(() => {
        if (segundos === 15) {
            dispatch(setClearResena())
            dispatch(comenzarResena(true))
        }
    }, [segundos, dispatch])

  return (
    <div className={`${(comenzar) && 'd-flex justify-content-center align-items-center'}`} style={{height: '100vh', backgroundPosition: 'center center', backgroundSize: 'cover', minHeight: '100vh'}}>
        {
            <>
                <div hidden = {!comenzar} className='text-center'>
                    <h1 className='text-center'>Nos gustaría que nos dijeras cómo le atendimos hoy</h1>
                    <div className="row">
                        <div className='d-grid gap-2 col-2 mx-auto'>
                            <button type='button' className = 'btn btn-primary btn-lg my-5' onClick={() => dispatch(comenzarResena(false))} style={{height: '50px'}}>Comenzar</button>
                        </div>
                    </div>
                </div>
                    
                <div hidden = {comenzar}>
                    <h1 className='text-black text-center mt-5 mb-3'>Seleccione el personal que le atendió el día de hoy</h1>
                    <div className="row p-2 my-2">
                        {
                            usuarios?.filter(usuarios => usuarios?.role === 'Usuario' && !usuarios?.name?.includes('Jordy') && !usuarios?.name?.includes('Mariela') && !usuarios?.name?.includes('Lorena') && !usuarios?.name?.includes('Joanny') && !usuarios?.name?.includes('Laury'))?.map(usuario => {
                                return (
                                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-1 col-xl-1 col-xxl-1 d-flex" style={{marginLeft: '40px', marginRight: '40px'}}>
                                        <div onClick={() => dispatch(crearAResena(usuario))} className='bg-transparent d-flex flex-column mx-auto align-items-center' style={{width: 'auto', height: 'auto', borderRadius: '10px'}}>
                                            {
                                                (AResena?.includes(usuario))
                                                    &&
                                                <i style={{fontSize: '35px', position: 'absolute', zIndex: 1045, top: 0, right: -50}} className="text-primary bi bi-check-circle-fill"></i>
                                            }
                                            <img src={(usuario?.urlImage) ? usuario?.urlImage : user} className='img-fluid' style={{cursor: 'pointer', height: 'auto', width: 'auto', maxHeight: '170px', maxWidth: '170px', objectFit: 'cover', borderRadius: '20px', opacity: (AResena?.includes(usuario)) && 0.5}} alt="" />
                                            <>
                                                <h5 className='text-black text-center'>{usuario?.name}</h5>
                                                {/* <p style={{fontSize: '15px'}} className='text-black text-center'>{usuario?.role}</p> */}
                                            </>
                                        </div>
                                    </div>
                                )
                            })
                        }

                        <div className="row">
                            <div className='d-grid gap-2 col-2 mx-auto mt-5'>
                                <button type='button' hidden = {(AResena?.length === 0)} onClick={modalOpen} className = 'btn btn-primary btn-lg' style={{height: '50px'}}>Evaluar</button>
                            </div>
                        </div>

                    </div>

                    {
                        (modalShow)
                            &&
                        <ModalEvaluacion modalShow = {modalShow} setModalShow = {setModalShow} resena = {AResena} />
                    }
                </div>
            </>
        }
    </div>
  )
}
