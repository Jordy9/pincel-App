import React from 'react'
import { useDispatch } from 'react-redux';
import { iniciarLogout } from '../store/auth/thunk'

export const IconExit = () => {

  const dispatch = useDispatch();

  return (
    <div onClick={() => dispatch(iniciarLogout())} style={{position: 'absolute', zIndex: 1045, right: '20px', top: '15px', backgroundColor: 'transparent', cursor: 'pointer'}}>
      <i style={{fontSize: '30px'}} className="bi bi-box-arrow-right text-danger"></i>
    </div>
  )
}
