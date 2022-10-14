import React from 'react'
import { Sidebar } from '../Sidebar'
import user from '../../heroes/user.webp'

export const Comunicado = () => {
  return (
    <Sidebar>
        <div className='p-4'>
            <h1>Comunicado a emitir</h1>
           <div className="row my-5">
            <div className="col-8">
                <div className="row">
                    <div className="col-12 form-group">
                        <input type="text" placeholder='Titulo del comunicado' className='form-control' />
                    </div>

                    <div className="col-12 form-group">
                        <textarea name="" id="" rows="10" className='form-control' placeholder='Su comunicado aqui'></textarea>
                    </div>
                    
                    <div className='d-grid gap-2 col-6 mx-auto'>
                        <button type='submit' className = 'btn btn-primary  my-2'>Guardar</button>
                    </div>
                </div>
            </div>

            <div className="col-4">
                <div className="shadow p-4" style={{borderRadius: '20px', height: '370px', overflowY: 'auto', borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}}>
                    <h4 className='text-center'>Visto y entendido</h4>

                    <div className='p-2 my-2' style={{backgroundColor: 'lightgray', borderRadius: '20px'}}>
                        <div className="row">
                            <div className="col-3">
                                <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                    <img src={user} className='img-fluid' alt="" />
                                </div>
                            </div>

                            <div className="col-7 d-flex justify-content-start align-items-center">
                                <span><strong>Jordy Perez</strong></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           </div>
        </div>
    </Sidebar>
  )
}
