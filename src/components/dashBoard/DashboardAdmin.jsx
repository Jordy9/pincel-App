import React from 'react'
import { Sidebar } from '../Sidebar'
import { CardsAdmin } from './CardsAdmin'
import { TableAdmin } from './TableAdmin'
import { useSelector } from 'react-redux'
import moment from 'moment'

export const DashboardAdmin = () => {

  const { name } = useSelector(state => state.auth);

  const { resena } = useSelector(state => state.rs);

  const resenasFiltradas = resena?.filter(resena => moment(resena?.createdAt).format('M') === moment().format('M'))

  return (
    <Sidebar>
        <div className='text-black p-4'>
        <h1>Buenos días, <span className='text-muted'>{name}</span></h1>
          <div className="row my-5">
            <CardsAdmin resenasFiltradas = {resenasFiltradas} mes = {moment().format('M')} />
          </div>

          <div className="row">
            <TableAdmin />
          </div>
      </div>
    </Sidebar>
  )
}
