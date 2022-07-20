import React from 'react'
import { Sidebar } from '../Sidebar'
import { TableComunicadosUser } from './TableComunicadosUser'

export const ListadoComunicadoUser = () => {
  return (
    <Sidebar>
        <div className='p-4'>
            <h1>Listado de comunicados</h1>
            
            <div className="row my-5">
                <TableComunicadosUser />
            </div>
        </div>
    </Sidebar>
  )
}
