import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useResponsive } from '../../hooks/useResponsive'

export const Cards = () => {

  const navigate =useNavigate()

  const VideoComponent = () => {
    navigate('/capacitacion/1')
  }

  const [respWidth] = useResponsive()
  
  return (
    <>
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-col-xxl-3 my-2">
        <div className='bg-transparent d-flex flex-column' style={{width: '100%', height: (respWidth >= 992) ? '300px' : 'auto', borderRadius: '10px'}}>
          <img src="https://cdn.pixabay.com/photo/2020/04/22/12/28/book-5077895__340.jpg" className='img-fluid' style={{borderRadius: '20px'}} alt="" />
          <div className='p-2'>
            <h5>Atencion al cliente</h5>
            <p style={{fontSize: '13.5px'}} className='text-muted'>Duracion: 2 h 05 min</p>
            <div className="progress my-2">
              <div className="progress-bar" role="progressbar" style={{width: '25%', backgroundColor: 'rgb(89, 7, 211)'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
            </div>
            <button onClick={VideoComponent} className='btn btn-primary form-control'>Continuar capacitación</button>
          </div>
        </div>
      </div>
      
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-col-xxl-3 my-2">
        <div className='bg-transparent d-flex flex-column' style={{width: '100%', height: (respWidth >= 992) ? '300px' : 'auto', borderRadius: '10px'}}>
          <img src="https://cdn.pixabay.com/photo/2020/04/22/12/28/book-5077895__340.jpg" className='img-fluid' style={{borderRadius: '20px'}} alt="" />
          <div className='p-2'>
            <h5>Que es el cliente</h5>
            <p style={{fontSize: '13.5px'}} className='text-muted'>Duracion: 2 h 05 min</p>
            {/* <div className="progress my-2">
              <div className="progress-bar" role="progressbar" style={{width: '70%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
            </div> */}
            <button className='btn btn-primary form-control'>Empazar capacitación</button>
          </div>
        </div>
      </div>

      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-col-xxl-3 my-2">
        <div className='bg-transparent d-flex flex-column' style={{width: '100%', height: (respWidth >= 992) ? '300px' : 'auto', borderRadius: '10px'}}>
          <img src="https://cdn.pixabay.com/photo/2020/04/22/12/28/book-5077895__340.jpg" className='img-fluid' style={{borderRadius: '20px'}} alt="" />
          <div className='p-2'>
            <h5>Quienes somos?</h5>
            <p style={{fontSize: '13.5px'}} className='text-muted'>Duracion: 2 h 05 min</p>
            {/* <div className="progress my-2">
              <div className="progress-bar" role="progressbar" style={{width: '70%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
            </div> */}
            <button className='btn btn-primary form-control'>Empazar capacitación</button>
          </div>
        </div>
      </div>

      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-col-xxl-3 my-2">
        <div className='bg-transparent d-flex flex-column' style={{width: '100%', height: (respWidth >= 992) ? '300px' : 'auto', borderRadius: '10px'}}>
          <img src="https://cdn.pixabay.com/photo/2020/04/22/12/28/book-5077895__340.jpg" className='img-fluid' style={{borderRadius: '20px'}} alt="" />
          <div className='p-2'>
            <h5>Capacitaciones realizadas</h5>
            <p style={{fontSize: '13.5px'}} className='text-muted'>Duracion: 2 h 05 min</p>
            {/* <div className="progress my-2">
              <div className="progress-bar" role="progressbar" style={{width: '70%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
            </div> */}
            <button className='btn btn-primary form-control'>Empazar capacitación</button>
          </div>
        </div>
      </div>
    </>
  )
}
