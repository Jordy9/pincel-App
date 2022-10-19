import React from 'react'
import { Offcanvas } from 'react-bootstrap'

export const SidebarResena = ({children}) => {

  return (
    <>
        <div className='row mt-5'>
          <div className="col-2 pt-3">
              <div style={{width: '251px', height: '100%', backgroundColor: 'rgb(10, 25, 45)', color: 'white', borderRadius: '35px', position: 'fixed'}}>
                    
              </div>
          </div>

          <div className="col-10">
              {children}
          </div>
        </div>
          :
        <>
          {/* <i id='logo-list' style = {{cursor: 'pointer', color: 'rgb(10, 25, 45)', fontSize: '30px', position: 'absolute', zIndex: 1045, top: '15px', left: '15px', margin: 0, padding: 0}} onClick={handledShow} className="bi bi-list"></i>
          <div className='row my-5'>

            <Offcanvas style = {{backgroundColor: 'rgb(10, 25, 45)', color: 'white'}} show={show} onHide={handledClose} >
              <Offcanvas.Header closeButton><h1>Gran Salón Express</h1></Offcanvas.Header>
                <ul>
       
                </ul>
              <Offcanvas.Body className='mt-3 secondary'>
                <ul className='list-group list-group-flush'>

            
                </ul>
              </Offcanvas.Body>
            </Offcanvas>

            <div className="col-12">
                {children}
            </div>
          </div> */}
        </>
      

    </>
  )
}
