import React from 'react'

export const Cards = () => {
  return (
    <>
        <div className="col-3">
          <div className='text-white shadow p-3 d-flex flex-column fondos-cards' style={{width: '100%', height: '300px'}}>
              <h5 style={{fontSize: '50px'}}><i className="bi bi-activity"></i></h5>

              <h5 className='text-left my-3'>Capacitaciones realizadas</h5>

              <h6 style={{fontSize: '20px'}}><i className="bi bi-clipboard-check text-white"> </i>Estas son las capacitaciones que has terminado correctamente</h6>
              <div className='primary p-2 text-center'>
                Tienes un total de: 25%
              </div>
          </div>
        </div>

        <div className="col-3">
          <div className='text-black shadow p-4 d-flex flex-column' style={{width: '100%', height: '300px', borderRadius: '35px', backgroundColor: 'white'}}>
            <div className="row p-2" style={{backgroundColor: 'lightgray', borderRadius: '20px'}}>
              <div className="col-6 d-flex justify-content-start align-items-start p-2">
                <div className='p-2 text-white' style={{borderRadius: '20px', backgroundColor: 'rgb(71, 7, 168)', width: 'auto', height: 'auto'}}>
                  <h1 className='text-center'>25%</h1>
                </div>
              </div>

              <div className="col-6 d-flex justify-content-end align-items-center p-2">
                <div className='p-2'>
                  <span><strong>Capacitaciones en curso%</strong></span>
                </div>
              </div>
            </div>

            <div className="row p-2 my-2" style={{backgroundColor: 'lightgray', borderRadius: '20px'}}>
              <div className="col-6 d-flex justify-content-start align-items-start p-2">
                <div className='p-2 text-white' style={{borderRadius: '20px', backgroundColor: 'rgb(71, 7, 168)', width: 'auto', height: 'auto'}}>
                  <h1 className='text-center'>25%</h1>
                </div>
              </div>

              <div className="col-6 d-flex justify-content-end align-items-center p-2">
                <div className='p-2'>
                  <span><strong>Capacitaciones disponibles</strong></span>
                </div>
              </div>

              <div className='btn primary p-2 text-center text-white'>
                Ver todas las capacitaciones
              </div>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className='text-black shadow p-4 d-flex flex-column' style={{width: '100%', height: '300px', borderRadius: '35px', backgroundColor: 'white'}}>
            <div className="row">
              <div className="col-6">
                <h5 style={{fontSize: '50px'}}><i style={{color: 'rgb(71, 7, 168)'}} className="bi bi-arrow-repeat"> </i></h5>
              </div>

              <div className="col-6 d-flex justify-content-center align-items-center">
                <h5><strong>Evaluaciones Por mejorar</strong></h5>
              </div>
            </div>

            <h5 className='text-center my-2'>Al hacer click en un titulo de estas evaluaciones, podras acceder a cualquiera de estas</h5>

            <div className="row my-2">
              <div className="col-4">
                <div className='btn primary p-2 text-center text-white'>
                  Ver todas las capacitaciones
                </div>
              </div>

              <div className="col-4">
                <div className='btn primary p-2 text-center text-white'>
                  Ver todas las capacitaciones
                </div>
              </div>

              <div className="col-4">
                <div className='btn primary p-2 text-center text-white'>
                  Ver todas las capacitaciones
                </div>
              </div>
            </div>
            <h5 className='p-2 text-center' style={{backgroundColor: 'lightgray', borderRadius: '35px'}}>Tienes un total de 20% por mejorar</h5>
          </div>
        </div>
    </>
  )
}
