import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Offcanvas } from 'react-bootstrap'
import { useResponsive } from '../hooks/useResponsive'
import { useDispatch, useSelector } from 'react-redux'
import { iniciarLogout } from '../store/auth/thunk'
import user from '../heroes/user.webp'

export const Sidebar = ({children}) => {

  const { usuarioActivo } = useSelector(state => state.auth);

  const { equipos } = useSelector(state => state.eq);

  const dispatch = useDispatch();

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

  const navigateToEvaluacion = () => {
    dispatch(iniciarLogout())
    navigate('/Evaluacion')
  }

  const [ respWidth ] = useResponsive()

  const {notificaciones} = useSelector(state => state.nt)
  
  const notificacionesFiltradas = notificaciones.filter(not => not.from !== usuarioActivo?.id)

  const notify = notificacionesFiltradas.filter(not => not.to === usuarioActivo?.id)

  const activeStyle = {
    color: 'rgb(89, 7, 211)'
  }

  let usuariosFiltrado = []

  equipos?.filter(equipo => usuariosFiltrado.push(equipo?.items[0]?.id))

  const isLeader = usuariosFiltrado?.includes(usuarioActivo?.id)

  return (
    <>
      { 
        (respWidth >= 992)
          ?
        <div className='row'>
          <div className="col-2 p-1">
              <div style={{width: '100%', height: '100%', backgroundColor: 'rgb(10, 25, 45)', color: 'white', borderRadius: '35px'}}>
                <NavLink className='d-flex justify-content-center p-3' to='/perfil'>
                  <div className='d-flex justify-content-center' style={{width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                    <img src={usuarioActivo?.urlImage || user} className='img-fluid' alt="" />
                  </div>
                </NavLink>
                <h5 className='text-center'>{usuarioActivo?.name} {usuarioActivo?.lastName}</h5>
                <div className='d-flex justify-content-center'>
                  <button onClick={navigateTo} className='btn btn-primary text-white'>Ver perfil</button>
                </div>
                <div className='my-5 secondary' style={{overflowY: 'auto'}}>
                  {
                    (usuarioActivo?.role && usuarioActivo?.role === 'Usuario' && !isLeader)
                      &&
                    <>
                      {/* <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/pincel-admin'><i style={{fontSize: '25px'}} className="bi bi-menu-button-fill"> </i><span>Administrativo</span></NavLink> */}
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/pincel'><i style={{fontSize: '25px'}} className="bi bi-house-door-fill"> </i><span>Inicio</span></NavLink>
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/capacitacion'><i style={{fontSize: '25px'}} className="bi bi-award-fill"> </i><span>Capacitación</span></NavLink>
                      <NavLink onClick={() => dispatch(iniciarLogout())} style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/login'><i style={{fontSize: '25px'}} className="bi bi-box-arrow-right"> </i><span>Cerrar sesión</span></NavLink>
                      {/* <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/formCapacitaciones'><i style={{fontSize: '25px'}} className="bi bi-textarea-resize"> </i><span>Crear capacitación</span></NavLink> */}
                      {/* <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/ListVideos'><i style={{fontSize: '25px'}} className="bi bi-list-nested"> </i><span>Listado de videos</span></NavLink> */}
                      {/* <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/Aclaraciones'><i style={{fontSize: '25px', color: (notify?.length !== 0) && 'red'}} className="bi bi-question-lg"> </i><span>Aclaraciones</span></NavLink> */}
                      {/* <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/ListComunicadoUser'><i style={{fontSize: '25px'}} className="bi bi-list-nested"> </i><span>Listado de comunicados</span></NavLink> */}
                      {/* <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/Comunicado'><i style={{fontSize: '25px'}} className="bi bi-card-text"> </i><span>Comunicado</span></NavLink> */}
                      {/* <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/ListComunicados'><i style={{fontSize: '25px'}} className="bi bi-list-nested"> </i><span>Listado de comunicados</span></NavLink> */}
                    </>
                  }

                  {
                    (usuarioActivo?.role && usuarioActivo?.role === 'Usuario' && isLeader)
                      &&
                    <>
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/pincel-admin'><i style={{fontSize: '25px'}} className="bi bi-menu-button-fill"> </i><span>Administrativo</span></NavLink>
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/pincel'><i style={{fontSize: '25px'}} className="bi bi-house-door-fill"> </i><span>Inicio</span></NavLink>
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/capacitacion'><i style={{fontSize: '25px'}} className="bi bi-award-fill"> </i><span>Capacitación</span></NavLink>
                      <NavLink onClick={() => dispatch(iniciarLogout())} style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/login'><i style={{fontSize: '25px'}} className="bi bi-box-arrow-right"> </i><span>Cerrar sesión</span></NavLink>
                      {/* <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/Aclaraciones'><i style={{fontSize: '25px', color: (notify?.length !== 0) && 'red'}} className="bi bi-question-lg"> </i><span>Aclaraciones</span></NavLink>
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/Comunicado'><i style={{fontSize: '25px'}} className="bi bi-card-text"> </i><span>Comunicado</span></NavLink>
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/ListComunicados'><i style={{fontSize: '25px'}} className="bi bi-list-nested"> </i><span>Listado de comunicados</span></NavLink> */}
                    </>
                  }
                  
                  {
                    (usuarioActivo?.role && usuarioActivo?.role === 'Administrador')
                      &&
                    <>
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/pincel-admin'><i style={{fontSize: '25px'}} className="bi bi-menu-button-fill"> </i><span>Administrativo</span></NavLink>
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/pincel'><i style={{fontSize: '25px'}} className="bi bi-house-door-fill"> </i><span>Inicio</span></NavLink>
                      {/* <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/TipoResenas'><i style={{fontSize: '25px'}} className="bi bi-toggles"> </i><span>Tipo de reseñas</span></NavLink> */}
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/capacitacion'><i style={{fontSize: '25px'}} className="bi bi-award-fill"> </i><span>Capacitación</span></NavLink>
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/ListCapacitaciones'><i style={{fontSize: '25px'}} className="bi bi-list-nested"> </i><span>Listado de capacitaciones</span></NavLink>
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/Usuarios'><i style={{fontSize: '25px'}} className="bi bi-people-fill"> </i><span>Usuarios</span></NavLink>
                      <NavLink onClick={navigateToEvaluacion} style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/Evaluacion'><i style={{fontSize: '25px'}} className="bi bi-clipboard"> </i><span>Evaluación del personal</span></NavLink>
                      <NavLink onClick={() => dispatch(iniciarLogout())} style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/login'><i style={{fontSize: '25px'}} className="bi bi-box-arrow-right"> </i><span>Cerrar sesión</span></NavLink>
                      {/* <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/Aclaraciones'><i style={{fontSize: '25px', color: (notify?.length !== 0) && 'red'}} className="bi bi-question-lg"> </i><span>Aclaraciones</span></NavLink> */}
                      {/* <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/Comunicado'><i style={{fontSize: '25px'}} className="bi bi-card-text"> </i><span>Comunicado</span></NavLink>
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/ListComunicados'><i style={{fontSize: '25px'}} className="bi bi-list-nested"> </i><span>Listado de comunicados</span></NavLink> */}
                    </>
                  }
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
              <Offcanvas.Header closeVariant='white' closeButton><h1 className='mx-auto'>Gran Salón Express</h1></Offcanvas.Header>
                <ul>
                  <NavLink className='d-flex justify-content-center' to='/perfil'>
                    <div className='d-flex justify-content-center' style={{width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                      <img src={usuarioActivo?.urlImage || user} className='img-fluid' alt="" />
                    </div>
                  </NavLink>

                  <Offcanvas.Title><h5 className='text-center'>{usuarioActivo?.name} {usuarioActivo?.lastName}</h5></Offcanvas.Title>
                  <div className='d-flex justify-content-center'>
                    <button onClick={navigateTo} className='btn btn-primary text-white btn-sm'>Ver perfil</button>
                  </div>
                </ul>
              <Offcanvas.Body className='secondary'>
                <ul className='list-group list-group-flush'>

                  {
                    (usuarioActivo?.role && usuarioActivo?.role === 'Usuario' && !isLeader)
                      &&
                    <>
                      {/* <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-4 text-left ml-3' to='/pincel-admin'><i style={{fontSize: '25px'}} className="bi bi-menu-button-fill"> </i><span>Administrativo</span></NavLink> */}
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/pincel'><i style={{fontSize: '25px'}} className="bi bi-house-door-fill"> </i><span>Inicio</span></NavLink>
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/capacitacion'><i style={{fontSize: '25px'}} className="bi bi-award-fill"> </i><span>Capacitación</span></NavLink>
                      <NavLink onClick={() => dispatch(iniciarLogout())} style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/login'><i style={{fontSize: '25px'}} className="bi bi-box-arrow-right"> </i><span>Cerrar sesión</span></NavLink>
                      {/* <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/formCapacitaciones'><i style={{fontSize: '25px'}} className="bi bi-textarea-resize"> </i><span>Crear capacitación</span></NavLink> */}
                      {/* <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/ListVideos'><i style={{fontSize: '25px'}} className="bi bi-list-nested"> </i><span>Listado de videos</span></NavLink> */}
                      {/* <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/Aclaraciones'><i style={{fontSize: '25px', color: (notify?.length !== 0) && 'red'}} className="bi bi-question-lg"> </i><span>Aclaraciones</span></NavLink> */}
                      {/* <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/ListComunicadoUser'><i style={{fontSize: '25px'}} className="bi bi-list-nested"> </i><span>Listado de comunicados</span></NavLink> */}
                      {/* <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/Comunicado'><i style={{fontSize: '25px'}} className="bi bi-card-text"> </i><span>Comunicado</span></NavLink> */}
                      {/* <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/ListComunicados'><i style={{fontSize: '25px'}} className="bi bi-list-nested"> </i><span>Listado de comunicados</span></NavLink> */}
                    </>
                  }

                  {
                    (usuarioActivo?.role && usuarioActivo?.role === 'Usuario' && isLeader)
                      &&
                    <>
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/pincel-admin'><i style={{fontSize: '25px'}} className="bi bi-menu-button-fill"> </i><span>Administrativo</span></NavLink>
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/pincel'><i style={{fontSize: '25px'}} className="bi bi-house-door-fill"> </i><span>Inicio</span></NavLink>
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/capacitacion'><i style={{fontSize: '25px'}} className="bi bi-award-fill"> </i><span>Capacitación</span></NavLink>
                      <NavLink onClick={() => dispatch(iniciarLogout())} style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/login'><i style={{fontSize: '25px'}} className="bi bi-box-arrow-right"> </i><span>Cerrar sesión</span></NavLink>
                      {/* <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/Aclaraciones'><i style={{fontSize: '25px', color: (notify?.length !== 0) && 'red'}} className="bi bi-question-lg"> </i><span>Aclaraciones</span></NavLink>
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/Comunicado'><i style={{fontSize: '25px'}} className="bi bi-card-text"> </i><span>Comunicado</span></NavLink>
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/ListComunicados'><i style={{fontSize: '25px'}} className="bi bi-list-nested"> </i><span>Listado de comunicados</span></NavLink> */}
                    </>
                  }

                  {
                    (usuarioActivo?.role && usuarioActivo?.role === 'Administrador')
                      &&
                    <>
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/pincel-admin'><i style={{fontSize: '25px'}} className="bi bi-menu-button-fill"> </i><span>Administrativo</span></NavLink>
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/pincel'><i style={{fontSize: '25px'}} className="bi bi-house-door-fill"> </i><span>Inicio</span></NavLink>
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/capacitacion'><i style={{fontSize: '25px'}} className="bi bi-award-fill"> </i><span>Capacitación</span></NavLink>
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/ListCapacitaciones'><i style={{fontSize: '25px'}} className="bi bi-list-nested"> </i><span>Listado de capacitaciones</span></NavLink>
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/Usuarios'><i style={{fontSize: '25px'}} className="bi bi-people-fill"> </i><span>Usuarios</span></NavLink>
                      <NavLink onClick={navigateToEvaluacion} style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/Evaluacion'><i style={{fontSize: '25px'}} className="bi bi-clipboard"> </i><span>Evaluación del personal</span></NavLink>
                      <NavLink onClick={() => dispatch(iniciarLogout())} style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/login'><i style={{fontSize: '25px'}} className="bi bi-box-arrow-right"> </i><span>Cerrar sesión</span></NavLink>
                      {/* <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/Aclaraciones'><i style={{fontSize: '25px', color: (notify?.length !== 0) && 'red'}} className="bi bi-question-lg"> </i><span>Aclaraciones</span></NavLink> */}
                      {/* <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/Comunicado'><i style={{fontSize: '25px'}} className="bi bi-card-text"> </i><span>Comunicado</span></NavLink>
                      <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link my-3 text-left ml-3' to='/ListComunicados'><i style={{fontSize: '25px'}} className="bi bi-list-nested"> </i><span>Listado de comunicados</span></NavLink> */}
                    </>
                  }
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
