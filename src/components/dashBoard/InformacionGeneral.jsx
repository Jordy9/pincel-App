import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { useResponsive } from '../../hooks/useResponsive'
import { activeCapacitacion } from '../../store/capacitacion/capacitacionSlice';
import { ModalInformacionCalificacion } from './ModalInformacionCalificacion';

export const InformacionGeneral = () => {

    const dispatch = useDispatch();

    const { uid, usuarioActivo } = useSelector(state => state.auth);

    const { capacitacion } = useSelector(state => state.cp);

    const { evaluacion } = useSelector(state => state.ev);

    const [ respWidth ] = useResponsive()

    const navigate = useNavigate()

    const VideoComponent = (id) => {
        navigate(`/capacitacion/${id}`)
        const capacitacionfilter = capacitacion?.filter(capacitacion => capacitacion?._id === id)
    
        if (capacitacionfilter?.length !== 0) {
          dispatch(activeCapacitacion({_id: capacitacionfilter[0]?._id, videos: capacitacionfilter[0]?.video[0], preguntas: capacitacionfilter[0]?.Preguntas, descripcion: capacitacionfilter[0]?.descripcion, usuariosEvaluacion: capacitacionfilter[0]?.usuariosEvaluacion, intentos: capacitacionfilter[0]?.intentos, EvaluatShow: capacitacionfilter[0]?.EvaluatShow, title: capacitacionfilter[0]?.title}))
        }
    }

    // Evaluaciones por mejorar

    const evaluacionesFiltradas = evaluacion?.filter(evaluacion => evaluacion?.calificacion < 90 && evaluacion?.idUsuario === uid)

    const capacitacionMostrar = capacitacion?.filter(
        capacitacion => evaluacionesFiltradas?.some(evaluacion => evaluacion.idCapacitacion === capacitacion?._id)
          &&
        capacitacion?.usuariosEvaluacion?.some(intentos => intentos?.id === uid && intentos?.intentos !== 0)
          &&
        capacitacion?.publicar === true
          &&
        capacitacion?.team?.some(team => team?.value === usuarioActivo?.team)
    )

    // Fin Evaluaciones por mejorar

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false
        }
      }
    ]
  };

    let sumaPorcentage = []

    let sumaPorcentageEnCurso = []

    capacitacion?.filter(
        capacitacion => capacitacion?.publicar === true 
          && 
        capacitacion?.team?.some(team => team?.value === usuarioActivo?.team)
      )?.map(({video}) => {
        const CantidadCheck = video?.filter(video => video?.check?.some(check => check?.id === uid))
    
        const porcentaje = parseInt((CantidadCheck?.length / video?.length) * 100)   
        return (
          (porcentaje === 100) ? sumaPorcentage.push(porcentaje) : sumaPorcentageEnCurso.push(porcentaje)
        )
      })
    
    const evaluacionFiltrada = evaluacion?.filter(evaluacion => evaluacion?.idUsuario === uid && capacitacion?.some(capacitacion => capacitacion?.publicar === true && evaluacion?.idCapacitacion === capacitacion?._id && capacitacion?.team?.some(team => team?.value === usuarioActivo?.team)))

    let arregloCalificaciones = []

    capacitacion?.filter(capacitacion => capacitacion?.publicar === true && capacitacion?.team?.some(team => team?.value === usuarioActivo?.team) && evaluacionFiltrada?.some(evaluacion => evaluacion?.idCapacitacion === capacitacion?._id))?.map(cap => {
        const ev = evaluacionFiltrada?.filter(evaluacion => evaluacion?.idCapacitacion === cap?._id)
        return (
            arregloCalificaciones.push({titulo: cap?.title, evaluacion: ev[0]?.calificacion, _id: cap?._id})
        )
    })

    const [showModal, setShowModal] = useState(false)

    const PaginateCalificacion8 = () => {
      const allCalificacion = [...arregloCalificaciones]
      return allCalificacion?.slice(0, 8)
    }

  return (
    <>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 my-2">
          <div className='text-black shadow p-4 d-flex flex-column' style={{width: '100%', height: '300px', borderRadius: '35px', backgroundColor: 'white'}}>
            <div className="row">
              <div className="col-6">
                <h5 style={{fontSize: '50px'}}><i style={{color: 'rgb(71, 7, 168)'}} className="bi bi-arrow-repeat"> </i></h5>
              </div>

              <div className="col-6 d-flex justify-content-center align-items-center">
                <h5><strong>Evaluaciones Por mejorar</strong></h5>
              </div>
            </div>

            <h5 className='text-center my-3'>Selecciona la evaluacion que desees retomar, para mejorar la calificación</h5>

            <div className="row my-2">
              <Slider {...settings}>
                {
                  capacitacionMostrar?.map((Element, index) => {
                    const CantidadCheck = Element?.video?.filter(video => video?.check?.some(check => check?.id === uid))
                    const porcentaje = parseInt((CantidadCheck?.length / Element?.video?.length) * 100)     
                    return (
                      (porcentaje === 100)
                        &&
                      <div key={Element + index} className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 d-flex justify-content-center">
                        <div onClick={() => VideoComponent(Element?._id)} className='btn primary text-center text-white elipsisCard'>
                          {Element?.title}
                        </div>
                      </div>
                    )
                  })
                }
              </Slider>
            </div>
            <h5 className='p-2 text-center' style={{backgroundColor: 'lightgray', borderRadius: '35px'}}>Debes mejorar {capacitacionMostrar?.length}</h5>
          </div>
        </div>

        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 my-2'>
            <div className='shadow text-black p-3' style={{borderRadius: '35px', height: '300px', backgroundColor: 'white'}}>
                <div className="row p-2">
                    <div className="col-6">
                        <h4 style={{fontSize: '50px', color: 'rgb(71, 7, 168)'}}><i className="bi bi-file-person"></i></h4>
                    </div>

                    <div className="col-6 d-flex justify-content-center align-items-center">
                        <h5><strong>Mis resultados</strong></h5> 
                    </div>

                    <h5 className='text-center'>Calificaciones de evaluaciones realizadas</h5>

                    <div style={{backgroundColor: 'lightgray', borderRadius: '20px', height: '145px', overflowY: 'auto', overflowX: 'hidden', borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}}>
                        {
                            PaginateCalificacion8()?.map(calificacion => {
                                return (
                                    <h6 className='my-2'>{calificacion?.titulo}: {calificacion?.evaluacion?.toFixed()}/100</h6>
                                )
                            })
                        }
                        {
                          (arregloCalificaciones?.length > 5)
                            &&
                          <button onClick={() => setShowModal(true)} className='btn btn-primary form-control my-2'>Ver todas las calificaciones</button>
                        }
                    </div>
                </div>
            </div>
        </div>    

        {
          (showModal)
            &&
          <ModalInformacionCalificacion showModal={showModal} setShowModal = {setShowModal} calificacion = {arregloCalificaciones} VideoComponent = {VideoComponent} />
        }    
    </>
  )
}
