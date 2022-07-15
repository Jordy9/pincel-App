import React from 'react'
import { Sidebar } from '../Sidebar'
import { CardsAdmin } from './CardsAdmin'
import { TableAdmin } from './TableAdmin'
import { useSelector } from 'react-redux'

export const DashboardAdmin = () => {

  const { name } = useSelector(state => state.auth);
  return (
    <Sidebar>
        <div className='text-black p-4'>
        <h1>Buenos días, <span className='text-muted'>{name}</span></h1>
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
