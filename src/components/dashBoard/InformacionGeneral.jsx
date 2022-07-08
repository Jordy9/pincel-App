import React from 'react'

export const InformacionGeneral = () => {
  return (
    <>

        <div className="col-6 my-2">
            <div className='text-black shadow p-4 d-flex flex-column' style={{width: '100%', height: '300px', borderRadius: '35px', backgroundColor: 'rgb(7, 36, 65)'}}>
                <div className="row">
                    <div className="col-6">
                    <h5 style={{fontSize: '50px'}}><i style={{color: 'white'}} className="bi bi-emoji-smile"> </i></h5>
                    </div>

                    <div className="col-6 d-flex justify-content-center align-items-center">
                    <h5 className='text-white'><strong>Mi condición actual</strong></h5>
                    </div>
                </div>

            <div className="row my-2">
                <div className="col-6">
                    <div className='fondos-cards p-4 text-center text-white'>
                        <span>Indice general acumulado de las evaluaciones realizadas</span>
                        <h6>3.5 / 4</h6>
                    </div>
                </div>

                <div className="col-6">
                    <div className='fondos-cards p-4 text-center text-white'>
                        <span>Mi estado general en base a todas mis evaluaciones</span>
                        <h6>Normal</h6>
                    </div>
                </div>
            </div>
            <h5 className='p-2 text-center fondos-cards text-white'>Debes de tener un estado general normal o superior</h5>
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

                    <h5 className='text-center'>En este apartado podras ver las calificaciones de las evaluaciones realizadas</h5>

                    <div style={{backgroundColor: 'lightgray', borderRadius: '20px'}}>
                        <h6 className='my-2'>Catálogo en Línea: 6/10</h6>
                        <h6 className='my-2'>Base de Datos Ebsco Host: 6/10</h6>
                        <h6 className='my-2'>Base de Datos Ebsco Host: 6/10</h6>
                        <h6 className='my-2'>Base de Datos Ebsco Host: 6/10</h6>
                        <h6 className='my-2'>Base de Datos Ebsco Host: 6/10</h6>
                    </div>
                </div>
            </div>
        </div>        
    </>
  )
}
