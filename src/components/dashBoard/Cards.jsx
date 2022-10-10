import React from 'react'
import { useResponsive } from '../../hooks/useResponsive'
import Slider from "react-slick";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { activeCapacitacion } from '../../store/capacitacion/capacitacionSlice';

export const Cards = () => {

  const dispatch = useDispatch();

  const [ respWidth ] = useResponsive()

  const { capacitacion } = useSelector(state => state.cp);

  const { evaluacion } = useSelector(state => state.ev);

  const { uid, usuarioActivo } = useSelector(state => state.auth);

  const navigate = useNavigate()

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

  // Evaluaciones por mejorar

  const evaluacionesFiltradas = evaluacion?.filter(evaluacion => evaluacion?.calificacion < 90 && evaluacion?.idUsuario === uid)

  const capacitacionMostrar = capacitacion?.filter(
    capacitacion => evaluacionesFiltradas?.some(evaluacion => evaluacion.idCapacitacion === capacitacion?._id)
      &&
    capacitacion?.usuariosEvaluacion?.some(intentos => intentos?.id === uid && intentos?.intentos === 0)
  )

  // Fin Evaluaciones por mejorar

  // Porcentage cantidad de cursos

  let sumaPorcentage = []

  let sumaPorcentageEnCurso = []

  let sumDisponible = []

  capacitacion?.filter(
    capacitacion => capacitacion?.publicar === true 
      && 
    capacitacion?.team?.some(team => team?.value === uid || team?.value === usuarioActivo?.team)
  )?.map(({video}) => {
    const CantidadCheck = video?.filter(video => video?.check?.includes(uid))

    const porcentaje = parseInt((CantidadCheck?.length / video?.length) * 100)   
    return (
      (porcentaje === 100) ? sumaPorcentage.push(porcentaje) : (porcentaje === 0) ? sumDisponible.push(porcentaje) : sumaPorcentageEnCurso.push(porcentaje)
    )
  })

  const equipoFiltrado = capacitacion?.filter(
    capacitacion => capacitacion?.publicar === true 
      && 
    capacitacion?.team?.some(team => team?.value === uid || team?.value === usuarioActivo?.team)
  )

  let sumaCursosCompletos = equipoFiltrado?.length-sumaPorcentage?.length

  let totalCursos = equipoFiltrado?.length

  let enCurso = sumaPorcentageEnCurso?.length

  let disponible = sumDisponible?.length

  const VideoComponent = (id) => {
    navigate(`/capacitacion/${id}`)
    const capacitacionfilter = capacitacion?.filter(capacitacion => capacitacion?._id === id)

    if (capacitacionfilter?.length !== 0) {
      dispatch(activeCapacitacion({_id: capacitacionfilter[0]?._id, videos: capacitacionfilter[0]?.video[0], preguntas: capacitacionfilter[0]?.Preguntas, descripcion: capacitacionfilter[0]?.descripcion, usuariosEvaluacion: capacitacionfilter[0]?.usuariosEvaluacion, intentos: capacitacionfilter[0]?.intentos}))
    }
  }

  // Fin porcentage cantidad de cursos

  return (
    <>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 my-2">
          <div className='text-white shadow p-3 d-flex flex-column fondos-cards' style={{width: '100%', height: '300px'}}>
              <h5 style={{fontSize: '50px'}}><i className="bi bi-activity"></i></h5>

              <h5 className='text-left my-3'>Capacitaciones realizadas</h5>

              {
                (respWidth > 992 && respWidth < 1168)
                  ?
                <h6 className='my-2'><i className="bi bi-clipboard-check text-white"> </i>capacitaciones completadas</h6>
                  :
                <h6><i className="bi bi-clipboard-check text-white"> </i>Este es el total de las capacitaciones que has terminado correctamente</h6>
              }


              {
                (respWidth > 386 && respWidth < 992)
                  ?
                <div className='primary p-2 my-3 text-center'>
                  Tienes un total de: {sumaCursosCompletos || 0}/{totalCursos || 0}
                </div>
                  :
                <div className='primary p-2 text-center'>
                  Tienes un total de: {sumaCursosCompletos || 0}/{totalCursos || 0}
                </div>
              }
          </div>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 my-2">
          <div className='text-black shadow p-4 d-flex flex-column' style={{width: '100%', height: '300px', borderRadius: '35px', backgroundColor: 'white'}}>
            <div className="row p-2" style={{backgroundColor: 'lightgray', borderRadius: '20px'}}>
              <div className="col-5 d-flex justify-content-start align-items-start p-2">
                <div className='p-2 text-white' style={{borderRadius: '20px', backgroundColor: 'rgb(71, 7, 168)', width: 'auto', height: 'auto'}}>
                  {
                    (respWidth > 992 && respWidth < 1476)
                      ?
                    <h2 className='text-center'>{enCurso || 0}</h2>
                      :
                    <h1 className='text-center'>{enCurso || 0}</h1>
                  }
                </div>
              </div>

              <div className="col-7 d-flex justify-content-end align-items-center p-2">
                <div className='p-2'>
                  {
                    (respWidth > 992 && respWidth < 1476)
                      ?
                    <span><strong>En curso</strong></span>
                      :
                    <span><strong>Capacitaciones en curso</strong></span>
                  }
                </div>
              </div>
            </div>

            <div className="row p-2 my-2" style={{backgroundColor: 'lightgray', borderRadius: '20px'}}>
              <div className="col-5 d-flex justify-content-start align-items-start p-2">
                <div className='p-2 text-white' style={{borderRadius: '20px', backgroundColor: 'rgb(71, 7, 168)', width: 'auto', height: 'auto'}}>
                  {
                    (respWidth > 992 && respWidth < 1476)
                      ?
                    <h2 className='text-center'>{disponible || 0}</h2>
                      :
                    <h1 className='text-center'>{disponible || 0}</h1>
                  }
                </div>
              </div>

              <div className="col-7 d-flex justify-content-end align-items-center p-2">
                <div className='p-2'>
                  {
                    (respWidth > 992 && respWidth < 1476)
                      ?
                    <span><strong>Disponible</strong></span>
                      :
                    <span><strong>Capacitaciones disponibles</strong></span>
                  }
                </div>
              </div>

              <div onClick={() => navigate('/capacitacion')} className='btn primary p-2 text-center text-white'>
                Ver todas las capacitaciones
              </div>
            </div>
          </div>
        </div>

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
                    return (
                      <div key={Element + index} className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 d-flex justify-content-center">
                        <div onClick={() => VideoComponent(Element?._id)} className='btn primary text-center text-white'>
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
    </>
  )
}
