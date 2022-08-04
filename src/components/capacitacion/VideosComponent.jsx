import React from 'react'
import { CapacitacionTema } from './CapacitacionTema'
import { Evaluacion } from './Evaluacion'
import { Sidebar } from './Sidebar'
import { Container } from 'react-bootstrap'
import { Navb } from '../navb/Navb'

export const VideosComponent = () => {
  return (
      <>
      <Navb />
        <Container className='my-4'>
          <div className='text-black'>
              <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
                      <CapacitacionTema />

                      {/* <Evaluacion /> */}

                      <h4 className='p-4'>Descripcion general</h4>
                      <p className='p-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quas repellat pariatur facere molestias autem ea, nesciunt doloribus expedita qui accusamus magnam itaque aspernatur nisi, ratione exercitationem temporibus quam cumque.</p>
                  </div>

                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                    <Sidebar />
                  </div>
              </div>
          </div>
        </Container>
      </>
  )
}
