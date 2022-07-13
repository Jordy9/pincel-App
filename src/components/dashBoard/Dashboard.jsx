import React from 'react'
import { Sidebar } from '../Sidebar'
import { Cards } from './Cards'
import { InformacionGeneral } from './InformacionGeneral'
import { useSelector } from 'react-redux'

export const Dashboard = () => {

  const { name } = useSelector(state => state.auth);
  return (
    <Sidebar>
      <div className='text-black p-4'>
        <h1>Buenos días, <span className='text-muted'>{name}</span></h1>
          <div className="row my-5">
            <Cards />
          </div>

          <div className="row">
            <InformacionGeneral />
            {/* <Charts /> */}
          </div>
      </div>
    </Sidebar>
  )
}
