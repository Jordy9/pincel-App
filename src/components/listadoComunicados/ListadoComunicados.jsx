import React from 'react'
import { Sidebar } from '../Sidebar'
import { TableComunicados } from './TableComunicados'

export const ListadoComunicados = () => {
  return (
    <Sidebar>
        <div className='p-4'>
            <h1>Listado de comunicados</h1>
            
            <div className="row my-5">
                <TableComunicados />
            </div>
        </div>
    </Sidebar>
  )
}
