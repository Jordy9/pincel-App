import React from 'react'

export const CardsAdmin = () => {
  return (
    <>
        <div className="col-6">
          <div className='text-black shadow p-4 d-flex flex-column' style={{width: '100%', height: '300px', borderRadius: '35px', backgroundColor: 'white'}}>
            <div className="row">
              <div className="col-6">
                <h5 style={{fontSize: '50px'}}><i style={{color: 'rgb(71, 7, 168)'}} className="bi bi-people-fill"> </i></h5>
              </div>

              <div className="col-6 d-flex justify-content-center align-items-center">
                <h5 className='text-center'><strong>Promedio general de las evalucaciones</strong></h5>
              </div>
            </div>

            <h5 className='text-center my-2'>Empleados con un promedio de 90 en adelante</h5>

            <div className="row my-3">
              <div className="col-4">
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
              </div>

              <div className="col-4">
                <div className='btn primary p-2 text-center text-white d-flex justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                        <img src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg" className='img-fluid' alt="" />
                    </div>
                  María Rodriguez
                </div>
              </div>
            </div>
            <h5 className='p-2 text-center my-1' style={{backgroundColor: 'lightgray', borderRadius: '35px'}}>Hay un total de 20 empleados con este promedio</h5>
          </div>
        </div>

        <div className="col-6">
          <div className='text-black shadow p-4 d-flex flex-column' style={{width: '100%', height: '300px', borderRadius: '35px', backgroundColor: 'white'}}>
            <div className="row">
              <div className="col-6">
                <h5 style={{fontSize: '50px'}}><i style={{color: 'rgb(71, 7, 168)'}} className="bi bi-people-fill"> </i></h5>
              </div>

              <div className="col-6 d-flex justify-content-center align-items-center">
                <h5 className='text-center'><strong>Promedio general de las evalucaciones</strong></h5>
              </div>
            </div>

            <h5 className='text-center my-2'>Empleados con un promedio entre 60 y 89</h5>

            <div className="row my-3">
              <div className="col-4">
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
              </div>

              <div className="col-4">
                <div className='btn primary p-2 text-center text-white d-flex justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                        <img src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg" className='img-fluid' alt="" />
                    </div>
                  María Rodriguez
                </div>
              </div>
            </div>
            <h5 className='p-2 text-center my-1' style={{backgroundColor: 'lightgray', borderRadius: '35px'}}>Hay un total de 20 empleados con este promedio</h5>
          </div>
        </div>
    </>
  )
}
