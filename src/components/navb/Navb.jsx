import React, { useEffect, useState } from 'react'
import { Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import './Navb.css'

export const Navb = () => {

  const navigate = useNavigate()

  const { pathname } = useLocation()

  const [isRoute, setIsRoute] = useState(false)

  useEffect(() => {
    if (pathname === '/Aclaraciones') {
      setIsRoute(true)
    } else {
      setIsRoute(false)
    }
  }, [])
  

  const goBack = () => {
    if (isRoute) {
      navigate('/pincel')
    } else {
      navigate('/capacitacion')
    }
  }

  return (
    <Navbar style={{backgroundColor: 'rgb(10, 25, 45)'}} variant='dark' expand="lg">
      <i onClick={goBack} style={{fontSize: '30px', cursor: 'pointer'}} className="bi bi-arrow-left-circle-fill text-white mx-3"></i>
      <Navbar.Brand id='title-navbar-responsive' to='/pincel'>Pincel te capacita para el trabajo</Navbar.Brand>
    </Navbar>
  )
}
