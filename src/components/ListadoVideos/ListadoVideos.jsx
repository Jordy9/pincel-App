import React from 'react'
import { Sidebar } from '../Sidebar'
import { TableVideos } from './TableVideos'

export const ListadoVideos = () => {
  return (
    <Sidebar>
        <div className='p-4'>
            <h1>Listado de videos</h1>
            
            <div className="row my-5">
                <TableVideos />
            </div>
        </div>
    </Sidebar>
  )
}
