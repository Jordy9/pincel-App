import React from 'react'
import { useResponsive } from '../../hooks/useResponsive'

export const Cards = () => {

  const [ respWidth ] = useResponsive()
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
                <h6><i className="bi bi-clipboard-check text-white"> </i>Estas son las capacitaciones que has terminado correctamente</h6>
              }


              {
                (respWidth > 386 && respWidth < 992)
                  ?
                <div className='primary p-2 my-3 text-center'>
                  Tienes un total de: 25%
                </div>
                  :
                <div className='primary p-2 text-center'>
                  Tienes un total de: 25%
                </div>
              }
          </div>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 my-2">
          <div className='text-black shadow p-4 d-flex flex-column' style={{width: '100%', height: '300px', borderRadius: '35px', backgroundColor: 'white'}}>
            <div className="row p-2" style={{backgroundColor: 'lightgray', borderRadius: '20px'}}>
              <div className="col-6 d-flex justify-content-start align-items-start p-2">
                <div className='p-2 text-white' style={{borderRadius: '20px', backgroundColor: 'rgb(71, 7, 168)', width: 'auto', height: 'auto'}}>
                  {
                    (respWidth > 992 && respWidth < 1476)
                      ?
                    <h2 className='text-center'>25%</h2>
                      :
                    <h1 className='text-center'>25%</h1>
                  }
                </div>
              </div>

              <div className="col-6 d-flex justify-content-end align-items-center p-2">
                <div className='p-2'>
                  {
                    (respWidth > 992 && respWidth < 1476)
                      ?
                    <span><strong>En curso%</strong></span>
                      :
                    <span><strong>Capacitaciones en curso%</strong></span>
                  }
                </div>
              </div>
            </div>

            <div className="row p-2 my-2" style={{backgroundColor: 'lightgray', borderRadius: '20px'}}>
              <div className="col-6 d-flex justify-content-start align-items-start p-2">
                <div className='p-2 text-white' style={{borderRadius: '20px', backgroundColor: 'rgb(71, 7, 168)', width: 'auto', height: 'auto'}}>
                  {
                    (respWidth > 992 && respWidth < 1476)
                      ?
                    <h2 className='text-center'>25%</h2>
                      :
                    <h1 className='text-center'>25%</h1>
                  }
                </div>
              </div>

              <div className="col-6 d-flex justify-content-end align-items-center p-2">
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

              <div className='btn primary p-2 text-center text-white'>
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
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                <div className='btn primary p-2 text-center text-white'>
                  Ver todas las capacitaciones
                </div>
              </div>

              {/* <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                <div className='btn primary p-2 text-center text-white'>
                  Ver todas las capacitaciones
                </div>
              </div>

              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                <div className='btn primary p-2 text-center text-white'>
                  Ver todas las capacitaciones
                </div>
              </div> */}
            </div>
            <h5 className='p-2 text-center' style={{backgroundColor: 'lightgray', borderRadius: '35px'}}>Debes mejorar 20</h5>
          </div>
        </div>
    </>
  )
}
