import React, { useState } from 'react'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Spinner } from '../Spinner'

export const ToRedirect = ({capacitacionActiva}) => {

    const [show, setShow] = useState(false)

    useEffect(() => {
      setTimeout(() => {
        setShow(true)
      }, 2000);
    }, [])
    
  return (
    <>
        {
            (!capacitacionActiva)
                &&
            (!show)
                ?
            <Spinner />
                :
            <Navigate to='/capacitacion' />
        }
    </>
  )
}
