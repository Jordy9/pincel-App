import React, { useState } from 'react'
import { ModalEvaluacion } from './ModalEvaluacion'

export const Evaluacion = () => {
    
    const [modalShow, setModalShow] = useState(false)

    const modalOpen = () => {
        setModalShow(true)
    }

  return (
    <div style={{height: '100%', backgroundImage: 'url("https://cdn.pixabay.com/photo/2020/05/21/11/42/hair-salon-5200393_960_720.jpg")', backgroundPosition: 'center center', backgroundSize: 'cover', minHeight: '100vh'}}>
        <h1 className='text-white p-4'>Evalúa nuestro personal</h1>
        <div className="row p-4 my-2">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-col-xxl-3 my-2">
                <div className='bg-transparent d-flex flex-column' style={{width: '100%', height: 'auto', borderRadius: '10px'}}>
                    <img src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg" className='img-fluid' style={{borderRadius: '20px'}} alt="" />
                    <div className='p-2'>
                        <h5 className='text-white text-center'>Maria Rodriguez</h5>
                        <p style={{fontSize: '15px'}} className='text-white text-center'>Lavado de pelo</p>
                        <button onClick={modalOpen} className='btn btn-primary form-control'>Evaluar</button>
                    </div>
                </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-col-xxl-3 my-2">
                <div className='bg-transparent d-flex flex-column' style={{width: '100%', height: 'auto', borderRadius: '10px'}}>
                    <img src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg" className='img-fluid' style={{borderRadius: '20px'}} alt="" />
                    <div className='p-2'>
                        <h5 className='text-white text-center'>Maria Rodriguez</h5>
                        <p style={{fontSize: '15px'}} className='text-white text-center'>Lavado de pelo</p>
                        <button onClick={modalOpen} className='btn btn-primary form-control'>Evaluar</button>
                    </div>
                </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-col-xxl-3 my-2">
                <div className='bg-transparent d-flex flex-column' style={{width: '100%', height: 'auto', borderRadius: '10px'}}>
                    <img src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg" className='img-fluid' style={{borderRadius: '20px'}} alt="" />
                    <div className='p-2'>
                        <h5 className='text-white text-center'>Maria Rodriguez</h5>
                        <p style={{fontSize: '15px'}} className='text-white text-center'>Lavado de pelo</p>
                        <button onClick={modalOpen} className='btn btn-primary form-control'>Evaluar</button>
                    </div>
                </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-col-xxl-3 my-2">
                <div className='bg-transparent d-flex flex-column' style={{width: '100%', height: 'auto', borderRadius: '10px'}}>
                    <img src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg" className='img-fluid' style={{borderRadius: '20px'}} alt="" />
                    <div className='p-2'>
                        <h5 className='text-white text-center'>Maria Rodriguez</h5>
                        <p style={{fontSize: '15px'}} className='text-white text-center'>Lavado de pelo</p>
                        <button onClick={modalOpen} className='btn btn-primary form-control'>Evaluar</button>
                    </div>
                </div>
            </div>
        </div>
      <ModalEvaluacion modalShow = {modalShow} setModalShow = {setModalShow} />
    </div>
  )
}
