import React from 'react'
import { Sidebar } from '../Sidebar'
import { TableCapacitaciones } from './TableCapacitaciones'

export const ListadoCapacitaciones = () => {
  return (
    <Sidebar>
        <div className='p-4'>
            <h1>Listado de capacitaciones</h1>
            
            <div className="row my-5">
                <TableCapacitaciones />
            </div>
        </div>
    </Sidebar>
  )
}
