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
    <tr>
        <td className='d-flex justify-content-center'>
            <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                <img src={(urlImage) ? urlImage : user} className='img-fluid' alt="" />
            </div>
        </td>
        <td>{name}</td>
        <td>{lastName}</td>
        <td>{date}</td>
        <td>{email}</td>
        <td className={`${(role === 'Usuario') ? 'text-primary' : 'text-success'}`}>{role}</td>
        <td>
            <div>
                <button onClick={() => handledActive(props)} className='btn btn-primary mx-1'><i className="bi bi-eye text-info"></i></button>
                
                <button className='btn btn-primary mx-1'><i className="bi bi-trash-fill text-danger"></i></button>
            </div>
        </td>
    </tr>
  )
}
