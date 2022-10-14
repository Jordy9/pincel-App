import React from 'react'
import { Sidebar } from '../Sidebar'
import { TableUsers } from './TableUsers'

export const ListadoUsuarios = () => {
  return (
    <Sidebar>
        <div className='p-4'>
            <h1>Listado de Usuarios</h1>
            
            <div className="row my-5">
                <TableUsers />
            </div>
        </div>
    </Sidebar>
  )
}
