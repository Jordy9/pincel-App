import React, { useState } from 'react'
import { Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const Navb = () => {

  const navigate = useNavigate()

  const goBack = () => {
    navigate('/capacitacion')
  }

  return (
    <Navbar style={{backgroundColor: 'rgb(10, 25, 45)'}} variant='dark' expand="lg">
      <i onClick={goBack} style={{fontSize: '30px', cursor: 'pointer'}} className="bi bi-arrow-left-circle-fill text-white mx-3"></i>
      <Navbar.Brand to='/pincel' className='navbar-brand'>Pincel te capacita para el trabajo</Navbar.Brand>
    </Navbar>
  )
}
