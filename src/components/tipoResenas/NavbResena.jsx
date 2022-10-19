import React from 'react'
import { Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './Navb.css'

export const NavbResena = () => {

  const navigate = useNavigate()

  const goBack = () => {
    navigate('/pincel')
  }

  return (
    <Navbar style={{backgroundColor: 'rgb(10, 25, 45)'}} variant='dark' expand="lg" fixed='top'>
      <i onClick={goBack} style={{fontSize: '30px', cursor: 'pointer'}} className="bi bi-arrow-left-circle-fill text-white mx-3"></i>
      <Navbar.Brand id='title-navbar-responsive' to='/pincel'>Te capacitamos para el trabajo</Navbar.Brand>
    </Navbar>
  )
}
