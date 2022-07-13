import React from 'react'

export const Spinner = () => {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
      <div className="spinner-border" style={{width: '3rem', height: '3rem', color: 'rgb(71, 7, 168)'}} role="status">
        <span className="sr-only">Cargando...</span>
      </div>
    </div>
  )
}
