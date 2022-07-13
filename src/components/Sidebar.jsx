import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Offcanvas } from 'react-bootstrap'
import { useResponsive } from '../hooks/useResponsive'
import { useSelector } from 'react-redux'

export const Sidebar = ({children}) => {

  const { usuarioActivo } = useSelector(state => state.auth);

  const navigate = useNavigate()

  const [show, setShow] = useState(false);

  const handledClose = () => {
    setShow(false)
  }

  const handledShow = () => {
    setShow(true)
  }

  const navigateTo = () => {
    navigate('/perfil')
  }

  const [ respWidth ] = useResponsive()

  const {notificaciones} = useSelector(state => state.nt)
  
  const notificacionesFiltradas = notificaciones.filter(not => not.from !== usuarioActivo?.id)

  const notify = notificacionesFiltradas.filter(not => not.to === usuarioActivo?.id)

  return (
    <>
      {
        (respWidth >= 992)
          ?
        <div className='row'>
          <div className="col-2 p-1">
              <div style={{width: '100%', height: '70vh', backgroundColor: 'rgb(10, 25, 45)', color: 'white', borderRadius: '35px'}}>
                <NavLink className='d-flex justify-content-center p-3' to='/perfil'>
                  <div className='d-flex justify-content-center' style={{width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                    <img src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg" className='img-fluid' alt="" />
                  </div>
                </NavLink>
                <h5 className='text-center'>{usuarioActivo?.name} {usuarioActivo?.lastName}</h5>
                <div className='d-flex justify-content-center'>
                  <button onClick={navigateTo} className='btn btn-primary text-white'>Ver perfil</button>
                </div>
                <div className='my-5 secondary'>
                  <NavLink className='nav-link my-4 text-center' to='/pincel'><i style={{fontSize: '25px'}} className="bi bi-house-door-fill"> </i><span>Inicio</span></NavLink>
                  <NavLink className='nav-link my-4 text-center' to='/capacitacion'><i style={{fontSize: '25px'}} className="bi bi-award-fill"> </i><span>Capacitación</span></NavLink>
                  <NavLink className='nav-link my-4 text-center' to='/formCapacitaciones'><i style={{fontSize: '25px'}} className="bi bi-textarea-resize"> </i><span>Crear capacitación</span></NavLink>
                  <NavLink className='nav-link my-4 text-center' to='/ListVideos'><i style={{fontSize: '25px'}} className="bi bi-list-nested"> </i><span>Listado de videos</span></NavLink>
                  <NavLink className='nav-link my-4 text-center' to='/Aclaraciones'><i style={{fontSize: '25px', color: (notify?.length !== 0) && 'red'}} className="bi bi-question-lg"> </i><span>Aclaraciones</span></NavLink>
                </div>
              </div>
          </div>

          <div className="col-10">
              {children}
          </div>
          </div>
          :
        <>
          <i id='logo-list' style = {{cursor: 'pointer', color: 'rgb(10, 25, 45)', fontSize: '30px', position: 'absolute', zIndex: 1045, top: '15px', left: '15px', margin: 0, padding: 0}} onClick={handledShow} className="bi bi-list"></i>
          <div className='row my-5'>

            <Offcanvas style = {{backgroundColor: 'rgb(10, 25, 45)', color: 'white'}} show={show} onHide={handledClose} >
              <Offcanvas.Header closeButton><h1>PINCEL TE CAPACITA</h1></Offcanvas.Header>
                <ul>
                  <NavLink className='d-flex justify-content-center p-3' to='/perfil'>
                    <div className='d-flex justify-content-center' style={{width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                      <img src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg" className='img-fluid' alt="" />
                    </div>
                  </NavLink>

                  <Offcanvas.Title><h5 className='text-center'>Maria Rodriguez</h5></Offcanvas.Title>
                  <div className='d-flex justify-content-center'>
                    <button onClick={navigateTo} className='btn btn-primary text-white'>Ver perfil</button>
                  </div>
                </ul>
              <Offcanvas.Body className='mt-3 secondary'>
                <ul className='list-group list-group-flush'>
                  <NavLink className='nav-link my-4 text-center' to='/pincel'><i style={{fontSize: '25px'}} className="bi bi-house-door-fill"> </i><span>Inicio</span></NavLink>
                  <NavLink className='nav-link my-4 text-center' to='/capacitacion'><i style={{fontSize: '25px'}} className="bi bi-award-fill"> </i><span>Capacitación</span></NavLink>
                  <NavLink className='nav-link my-4 text-center' to='/formCapacitaciones'><i style={{fontSize: '25px'}} className="bi bi-textarea-resize"> </i><span>Crear capacitación</span></NavLink>
                  <NavLink className='nav-link my-4 text-center' to='/ListVideos'><i style={{fontSize: '25px'}} className="bi bi-list-nested"> </i><span>Listado de videos</span></NavLink>
                </ul>
              </Offcanvas.Body>
            </Offcanvas>

            <div className="col-12">
                {children}
            </div>
          </div>
        </>
      }

    </>
  )
}
