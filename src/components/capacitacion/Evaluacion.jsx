import React from 'react'

export const Evaluacion = () => {
  return (
    <div style={{width: '100%', height: '60vh', backgroundColor: 'white', borderBottom: '1px solid'}}>
        <h2 className='text-black p-4'>Evaluación</h2>

        <div className='p-4 text-black'>
            <h5>¿Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, itaque assumenda? Incidunt, reiciendis tenetur. Consequatur assumenda repudiandae earum corporis, odit labore distinctio asperiores corrupti eaque non, quo hic facilis culpa?</h5>

            <div className="row p-4 my-5">
                <div className="col-3">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label">Lorem</label>
                    </div>
                </div>

                <div className="col-3">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label">Lorem</label>
                    </div>
                </div>

                <div className="col-3">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label">Lorem</label>
                    </div>
                </div>

                <div className="col-3">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label">Lorem</label>
                    </div>
                </div>
            </div>

            <div className='d-flex justify-content-end' style={{flexDirection: 'row'}}>
                <button className='btn btn-primary mx-2'>Anterior</button>
                <button className='btn btn-primary mx-2'>Siguiente</button>
            </div>
        </div>
    </div>
  )
}
