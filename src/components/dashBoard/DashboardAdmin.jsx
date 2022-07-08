import React from 'react'
import { Sidebar } from '../Sidebar'
import { CardsAdmin } from './CardsAdmin'
import { TableAdmin } from './TableAdmin'

export const DashboardAdmin = () => {
  return (
    <Sidebar>
        <div className='text-black p-4'>
        <h1>Buenos dias, <span className='text-muted'>Maria</span></h1>
          <div className="row my-5">
            <CardsAdmin />
          </div>

          <div className="row">
            <TableAdmin />
          </div>
      </div>
    </Sidebar>
  )
}
