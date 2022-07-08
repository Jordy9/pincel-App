import React from 'react'
import { Container } from 'react-bootstrap'
import { Sidebar } from '../Sidebar'
import { Cards } from './Cards'
// import { Charts } from './Charts'
// import { Charts } from './Charts'
import { InformacionGeneral } from './InformacionGeneral'

export const Dashboard = () => {
  return (
    <Sidebar>
      <div className='text-black p-4'>
        <h1>Buenos dias, <span className='text-muted'>Maria</span></h1>
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
