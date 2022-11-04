import React from 'react'
import { useResponsive } from '../../hooks/useResponsive'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Cards = () => {

  const [ respWidth ] = useResponsive()

  const { capacitacion } = useSelector(state => state.cp);

  const { evaluacion } = useSelector(state => state.ev);

  const { uid, usuarioActivo } = useSelector(state => state.auth);

  const navigate = useNavigate()

  // Porcentage cantidad de cursos

  let sumaPorcentage = []

  let sumaPorcentageEnCurso = []

  let sumDisponible = []

  capacitacion?.filter(
    capacitacion => capacitacion?.publicar === true 
      && 
    capacitacion?.team?.some(team => team?.value === uid || team?.value === usuarioActivo?.team)
  )?.map(({video, _id, EvaluatShow}) => {
    const CantidadCheck = video?.filter(video => video?.check?.some(check => check?.id === uid))

    const evaluacionFilt = evaluacion?.filter(evaluacion => evaluacion?.idUsuario === uid && evaluacion?.idCapacitacion === _id)

    const porcentaje = parseInt((CantidadCheck?.length / video?.length) * 100)
    return (
      (porcentaje === 100 && (evaluacionFilt?.length !== 0 || !EvaluatShow)) ? sumaPorcentage.push(porcentaje) : (porcentaje === 0) ? sumDisponible.push(porcentaje) : sumaPorcentageEnCurso.push(porcentaje)
    )
  })

  const equipoFiltrado = capacitacion?.filter(
    capacitacion => capacitacion?.publicar === true 
      && 
    capacitacion?.team?.some(team => team?.value === uid || team?.value === usuarioActivo?.team)
  )

  let sumaCursosCompletos = sumaPorcentage?.length

  let totalCursos = equipoFiltrado?.length

  let enCurso = sumaPorcentageEnCurso?.length

  let disponible = sumDisponible?.length

  // Fin porcentage cantidad de cursos

  const evaluacionFiltrada = evaluacion?.filter(evaluacion => evaluacion?.idUsuario === uid)

    let arregloCalificaciones = []

    capacitacion?.filter(capacitacion => evaluacionFiltrada?.some(evaluacion => evaluacion?.idCapacitacion === capacitacion?._id))?.map(cap => {
        const ev = evaluacionFiltrada?.filter(evaluacion => evaluacion?.idCapacitacion === cap?._id)
        return (
            arregloCalificaciones.push({titulo: cap?.title, evaluacion: ev[0]?.calificacion})
        )
    })

    let suma = 0

    evaluacionFiltrada?.map(evaluacion => suma = suma + evaluacion?.calificacion)

    const totalSumado = (evaluacionFiltrada?.length !== 0) ? suma/evaluacionFiltrada?.length : 0

    const porcentage = (evaluacionFiltrada?.length !== 0) ? (100*totalSumado) / 100 : 100

  // Condicion emojies
    let condicion = ''

    if (porcentage?.toFixed() <= 50) {
        condicion = 'bi-emoji-frown'
    } else if (porcentage?.toFixed() >= 51 && porcentage?.toFixed() <= 69) {
        condicion = 'bi-emoji-neutral'
    } else if (porcentage?.toFixed() >= 70 && porcentage?.toFixed() <= 90) {
        condicion = 'bi-emoji-smile'
    } else if (porcentage?.toFixed() >= 90) {
        condicion = 'bi-emoji-laughing'
    }
  // Fin Condicion emojies

  return (
    <>
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
        <div className='text-black shadow p-4 d-flex flex-column' style={{width: '100%', height: '300px', borderRadius: '35px', backgroundColor: 'rgb(7, 36, 65)'}}>
            <div className="row">
                <div className="col-6">
                    <h5 style={{fontSize: '50px'}}><i style={{color: 'white'}} className={`bi ${condicion}`}> </i></h5>
                </div>

                <div className="col-6 d-flex justify-content-center align-items-center">
                    <h5 className='text-white'><strong>Mi condición actual</strong></h5>
                </div>
            </div>

        <div className="row my-1">
            <div className="col-6">
                <div className='fondos-cards p-4 text-center text-white' style={{height: '110px', overflowY: 'auto', overflowX: 'hidden', borderBottomRightRadius: '10px', borderTopRightRadius: '10px'}}>
                    <span>Indice general</span>
                    <h3>{porcentage?.toFixed()}/100</h3>
                </div>
            </div>

            <div className="col-6">
                <div className='fondos-cards p-4 text-center text-white' style={{height: '110px', overflowY: 'auto', overflowX: 'hidden', borderBottomRightRadius: '10px', borderTopRightRadius: '10px'}}>
                    <span>Estado general</span>
                    {
                        (porcentage?.toFixed() <= 50)
                            &&
                        <h3>Malo</h3>
                    }

                    {
                        (porcentage?.toFixed() >= 51 && porcentage?.toFixed() <= 69)
                            &&
                        <h3>Mejorable</h3>
                    }

                    {
                        (porcentage?.toFixed() >= 70 && porcentage?.toFixed() <= 90)
                            &&
                        <h3>Normal</h3>
                    }

                    {
                        (porcentage?.toFixed() >= 90)
                            &&
                        <h3>Excelente</h3>
                    }
                </div>
            </div>
        </div>
        {
            (respWidth > 585 && respWidth < 768)
                ?
            <h5 className='p-2 my-4 text-center fondos-cards text-white'>Debes de tener un estado general normal o superior</h5>
                :
            <h5 className='p-2 my-2 text-center fondos-cards text-white'>Debes de tener un estado general normal o superior</h5>
        }
        </div>
    </div>

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

      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-3 my-2">
        <div className='text-black shadow p-4 d-flex flex-column' style={{width: '100%', height: '300px', borderRadius: '35px', backgroundColor: 'white'}}>
          <div className="row p-2" style={{backgroundColor: 'lightgray', borderRadius: '20px'}}>
            <div className="col-5 d-flex justify-content-start align-items-start p-2">
              <div className='p-2 text-white' style={{borderRadius: '20px', backgroundColor: 'rgb(1, 138, 1)', width: 'auto', height: 'auto'}}>
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
              <div className='p-2 text-white' style={{borderRadius: '20px', backgroundColor: 'rgb(1, 138, 1)', width: 'auto', height: 'auto'}}>
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
    </>
  )
}
