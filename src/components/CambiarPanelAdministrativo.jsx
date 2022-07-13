import React from 'react'
import { useDispatch } from 'react-redux'
// import { cambiarPanel } from '../store/auth/authSlice'

export const CambiarPanelAdministrativo = () => {
  const dispatch = useDispatch()
  
  return (
    <button  className='btn btn-primary' style={{position: 'absolute', zIndex: 1045, right: '200px', top: '15px'}}>CambiarPanelAdministrativo</button>
  )
}
