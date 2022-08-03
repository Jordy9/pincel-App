import React from 'react'
import { Sidebar } from '../Sidebar'
import { Cards } from './Cards'

export const Capacitacion = () => {
  return (
    <Sidebar>
      <div className='text-black p-4'>
        <h1>Capacitación</h1>
        <div className="row my-5">
          <Cards />
        </div>
      </div>
    </Sidebar>
  )
}
