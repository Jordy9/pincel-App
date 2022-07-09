import React from 'react'
import { useResponsive } from '../../hooks/useResponsive'

export const CardsAdmin = () => {

  const [ respWidth ] = useResponsive()

  return (
    <>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 my-2">
          <div className='text-black shadow p-4 d-flex flex-column' style={{width: '100%', height: '300px', borderRadius: '35px', backgroundColor: 'white'}}>
            <div className="row">
              <div className="col-6">
                <h5 style={{fontSize: '50px'}}><i style={{color: 'rgb(71, 7, 168)'}} className="bi bi-people-fill"> </i></h5>
              </div>

              <div className="col-6 d-flex justify-content-center align-items-center">
                <h5 className='text-center'><strong>Promedio general</strong></h5>
              </div>
            </div>

            <h5 className='text-center my-2'>Empleados con promedio de 90 en adelante</h5>

              {
                (respWidth >= 992)
                  ?
                <div className="row my-3">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-col-xxl-4">
                    <div className='btn primary p-2 text-center text-white d-flex justify-content-center align-items-center'>
                        <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                            <img src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg" className='img-fluid' alt="" />
                        </div>
                      María Rodriguez
                    </div>
                    </div>
                  </div>
                  :
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-col-xxl-4">
                      <div className='btn primary p-2 text-center text-white d-flex align-items-center'>
                          <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                              <img src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg" className='img-fluid' alt="" />
                          </div>
                          <span className='ml-4'>María Rodriguez</span>
                      </div>
                    </div>
                  </div>
              }

              {/* <div className="col-4">
                <div className='btn primary p-2 text-center text-white d-flex justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                        <img src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg" className='img-fluid' alt="" />
                    </div>
                  María Rodriguez
                </div>
              </div>

              <div className="col-4">
                <div className='btn primary p-2 text-center text-white d-flex justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                        <img src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg" className='img-fluid' alt="" />
                    </div>
                  María Rodriguez
                </div>
              </div> */}
              {
                (respWidth > 454 && respWidth < 992)
                  ?
                <h5 className='p-2 text-center my-3' style={{backgroundColor: 'lightgray', borderRadius: '35px'}}>Hay 20 empleados con este promedio</h5>
                  :
                <h5 className='p-2 text-center my-1' style={{backgroundColor: 'lightgray', borderRadius: '35px'}}>Hay 20 empleados con este promedio</h5>
              }
          </div>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 my-2">
          <div className='text-black shadow p-4 d-flex flex-column' style={{width: '100%', height: '300px', borderRadius: '35px', backgroundColor: 'white'}}>
            <div className="row">
              <div className="col-6">
                <h5 style={{fontSize: '50px'}}><i style={{color: 'rgb(71, 7, 168)'}} className="bi bi-people-fill"> </i></h5>
              </div>

              <div className="col-6 d-flex justify-content-center align-items-center">
                <h5 className='text-center'><strong>Promedio general</strong></h5>
              </div>
            </div>

            <h5 className='text-center my-2'>Empleados con un promedio menor de 89</h5>

              {
                (respWidth >= 992)
                  ?
                <div className="row my-3">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-col-xxl-4">
                    <div className='btn primary p-2 text-center text-white d-flex justify-content-center align-items-center'>
                        <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                            <img src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg" className='img-fluid' alt="" />
                        </div>
                      María Rodriguez
                    </div>
                    </div>
                  </div>
                  :
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-col-xxl-4">
                      <div className='btn primary p-2 text-center text-white d-flex align-items-center'>
                          <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                              <img src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg" className='img-fluid' alt="" />
                          </div>
                          <span className='ml-4'>María Rodriguez</span>
                      </div>
                    </div>
                  </div>
              }

              {
                (respWidth > 454 && respWidth < 992)
                  ?
                <h5 className='p-2 text-center my-3' style={{backgroundColor: 'lightgray', borderRadius: '35px'}}>Hay 20 empleados con este promedio</h5>
                  :
                <h5 className='p-2 text-center my-1' style={{backgroundColor: 'lightgray', borderRadius: '35px'}}>Hay 20 empleados con este promedio</h5>
              }
          </div>
        </div>
    </>
  )
}
