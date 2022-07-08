import React from 'react'
import { Container } from 'react-bootstrap'

export const TableAdmin = () => {
  return (
    <Container>
        <div className='table-responsive shadow p-4' style={{borderTopLeftRadius: '35px', borderBottomLeftRadius: '35px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: '300px'}}>
            <table className="table borderless">
                <thead>
                    <tr>
                        <th scope="col">Foto</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Capacitaciones completas</th>
                        <th scope="col">Capacitaciones por mejorar</th>
                        <th scope="col">Promedio</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                <img src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg" className='img-fluid' alt="" />
                            </div>
                        </td>
                        <td>Maria</td>
                        <td>Rodriguez</td>
                        <td>15</td>
                        <td>2</td>
                        <td>90</td>
                        <td>
                            <div>
                                <button className='btn btn-primary mx-1'><i className="bi bi-eye text-info"></i></button>
                                
                                <button className='btn btn-primary mx-1'><i className="bi bi-trash-fill text-danger"></i></button>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                <img src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg" className='img-fluid' alt="" />
                            </div>
                        </td>
                        <td>Maria</td>
                        <td>Rodriguez</td>
                        <td>15</td>
                        <td>2</td>
                        <td>90</td>
                        <td>
                            <div>
                                <button className='btn btn-primary mx-1'><i className="bi bi-eye text-info"></i></button>
                                
                                <button className='btn btn-primary mx-1'><i className="bi bi-trash-fill text-danger"></i></button>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                <img src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg" className='img-fluid' alt="" />
                            </div>
                        </td>
                        <td>Maria</td>
                        <td>Rodriguez</td>
                        <td>15</td>
                        <td>2</td>
                        <td>90</td>
                        <td>
                            <div>
                                <button className='btn btn-primary mx-1'><i className="bi bi-eye text-info"></i></button>
                                
                                <button className='btn btn-primary mx-1'><i className="bi bi-trash-fill text-danger"></i></button>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                <img src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg" className='img-fluid' alt="" />
                            </div>
                        </td>
                        <td>Maria</td>
                        <td>Rodriguez</td>
                        <td>15</td>
                        <td>2</td>
                        <td>90</td>
                        <td>
                            <div>
                                <button className='btn btn-primary mx-1'><i className="bi bi-eye text-info"></i></button>
                                
                                <button className='btn btn-primary mx-1'><i className="bi bi-trash-fill text-danger"></i></button>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                                <img src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg" className='img-fluid' alt="" />
                            </div>
                        </td>
                        <td>Maria</td>
                        <td>Rodriguez</td>
                        <td>15</td>
                        <td>2</td>
                        <td>90</td>
                        <td>
                            <div>
                                <button className='btn btn-primary mx-1'><i className="bi bi-eye text-info"></i></button>
                                
                                <button className='btn btn-primary mx-1'><i className="bi bi-trash-fill text-danger"></i></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Container>
  )
}
