import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export const Sidebar = ({children}) => {

  const navigate = useNavigate()

  const navigateTo = () => {
    navigate('/perfil')
  }

  return (
    <div className='row'>
        <div className="col-2 p-1">
            <div style={{width: '100%', height: '70vh', backgroundColor: 'rgb(10, 25, 45)', color: 'white', borderRadius: '35px'}}>
              <NavLink className='d-flex justify-content-center p-3' to='/perfil'>
                <div className='d-flex justify-content-center' style={{width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                  <img src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg" className='img-fluid' alt="" />
                </div>
              </NavLink>
              <h5 className='text-center'>Maria Rodriguez</h5>
              <div className='d-flex justify-content-center'>
                <button onClick={navigateTo} className='btn btn-primary text-white'>Ver perfil</button>
              </div>
              <div className='my-5 secondary'>
                <NavLink className='nav-link my-4 text-center' to='/pincel'><i className="bi bi-house-door-fill"> </i>Inicio</NavLink>
                <NavLink className='nav-link my-4 text-center' to='/capacitacion'><i className="bi bi-award-fill"> </i>Capacitación</NavLink>
                <NavLink className='nav-link my-4 text-center' to='/formCapacitaciones'><i className="bi bi-textarea-resize"> </i>Crear capacitación</NavLink>
                <NavLink className='nav-link my-4 text-center' to='/ListCapacitaciones'><i className="bi bi-list-nested"> </i>Listado de capacitación</NavLink>
              </div>
            </div>
        </div>

        <div className="col-10">
            {children}
        </div>
    </div>
  )
}
