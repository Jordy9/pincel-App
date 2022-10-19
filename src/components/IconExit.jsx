import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { iniciarLogout } from '../store/auth/thunk'

export const IconExit = () => {

  const dispatch = useDispatch();

  const { pathname } = useLocation()

  const [changePosition, setChangePosition] = useState('absolute')

  useEffect(() => {
    if (pathname === '/TipoResenas') {
      setChangePosition('fixed')
    } else {
      setChangePosition('absolute')
    }
  }, [pathname])
  
  return (
    <div onClick={() => dispatch(iniciarLogout())} style={{position: changePosition, zIndex: 1045, right: '20px', top: '15px', backgroundColor: 'transparent', cursor: 'pointer'}}>
      <i style={{fontSize: '30px'}} className="bi bi-box-arrow-right text-danger"></i>
    </div>
  )
}
