import React from 'react'
import { useSelector } from 'react-redux';
import { useResponsive } from '../../hooks/useResponsive'

export const InformacionGeneral = () => {

    const { uid, usuarioActivo } = useSelector(state => state.auth);

    const { capacitacion } = useSelector(state => state.cp);

    const { evaluacion } = useSelector(state => state.ev);

    const [ respWidth ] = useResponsive()

    let sumaPorcentage = []

    let sumaPorcentageEnCurso = []

    capacitacion?.filter(
        capacitacion => capacitacion?.publicar === true 
          && 
        capacitacion?.team?.some(team => team?.value === uid || team?.value === usuarioActivo?.team)
      )?.map(({video}) => {
        const CantidadCheck = video?.filter(video => video?.check?.includes(uid))
    
        const porcentaje = parseInt((CantidadCheck?.length / video?.length) * 100)   
        return (
          (porcentaje === 100) ? sumaPorcentage.push(porcentaje) : sumaPorcentageEnCurso.push(porcentaje)
        )
      })
    
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

    const totalSumado = suma/evaluacionFiltrada?.length

    const porcentage = (5*totalSumado) / 100 || 5

    let condicion = ''

    if (porcentage?.toFixed() <= 3) {
        condicion = 'bi-emoji-frown'
    } else if (porcentage?.toFixed() >= 3.1 && porcentage?.toFixed() <= 3.5) {
        condicion = 'bi-emoji-neutral'
    } else if (porcentage?.toFixed() >= 3.6 && porcentage?.toFixed() <= 4.5) {
        condicion = 'bi-emoji-smile'
    } else if (porcentage?.toFixed() >= 4.6) {
        condicion = 'bi-emoji-laughing'
    }

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
                        <h3>{porcentage?.toFixed()}/5</h3>
                    </div>
                </div>

                <div className="col-6">
                    <div className='fondos-cards p-4 text-center text-white' style={{height: '110px', overflowY: 'auto', overflowX: 'hidden', borderBottomRightRadius: '10px', borderTopRightRadius: '10px'}}>
                        <span>Estado general</span>
                        {
                            (porcentage?.toFixed() <= 3)
                                &&
                            <h3>Malo</h3>
                        }

                        {
                            (porcentage?.toFixed() >= 3.1 && porcentage?.toFixed() <= 3.5)
                                &&
                            <h3>Mejorable</h3>
                        }

                        {
                            (porcentage?.toFixed() >= 3.6 && porcentage?.toFixed() <= 4.5)
                                &&
                            <h3>Normal</h3>
                        }

                        {
                            (porcentage?.toFixed() >= 4.6)
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

        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2'>
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
                            arregloCalificaciones?.map(calificacion => {
                                return (
                                    <h6 className='my-2'>{calificacion?.titulo}: {calificacion?.evaluacion}/100</h6>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>        
    </>
  )
}
