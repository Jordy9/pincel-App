import React from 'react'
import user from '../../heroes/user.webp'
import { useDispatch } from 'react-redux'
import { modalOpen, setActiveUser } from '../../store/auth/authSlice';

export const TableContent = (props) => {

    const dispatch = useDispatch();

    const {name, lastName, date, email, urlImage, role} = props

    const handledActive = (user) => {
        dispatch(setActiveUser(user))
        dispatch(modalOpen())
    }
  return (
    <tr style={{cursor: 'pointer'}} onDoubleClick={() => handledActive(props)} data-bs-toggle="tooltip" data-bs-placement="left" title="Haga doble click sobre un usuario para ver su detalle">
        <td className='d-flex justify-content-center'>
            <div className='d-flex justify-content-center my-3' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                <img src={(urlImage) ? urlImage : user} className='img-fluid' alt="" />
            </div>
        </td>
        <td>{name}</td>
        <td>{lastName}</td>
        <td>10</td>
        <td>15</td>
        <td>
            <div data-bs-toggle="tooltip" data-bs-placement="left" title="3/10 cursos completados" className="progress my-2">
              <div className="progress-bar" role="progressbar" style={{width: '25%', backgroundColor: 'rgb(89, 7, 211)'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
            </div>
        </td>
        <td className={`${(role === 'Usuario') ? 'text-primary' : 'text-success'}`}>{role}</td>
        {/* <td>
            <div>
                <button onClick={() => handledActive(props)} className='btn btn-primary mx-1 my-1'><i className="bi bi-eye text-info"></i></button>
                
                <button className='btn btn-primary mx-1 my-1'><i className="bi bi-trash-fill text-danger"></i></button>
            </div>
        </td> */}
    </tr>
  )
}
