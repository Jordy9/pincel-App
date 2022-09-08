import React from 'react'
import user from '../../heroes/user.webp'
import { useDispatch, useSelector } from 'react-redux'
import { modalOpen, setActiveUser } from '../../store/auth/authSlice';
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import { useResponsive } from '../../hooks/useResponsive';
import moment from 'moment';

export const TableContent = (props) => {

    const dispatch = useDispatch();

    const { resena } = useSelector(state => state.rs);

    const { capacitacion } = useSelector(state => state.cp);

    const {id, name, lastName, urlImage, role} = props

    const handledActive = (user) => {
        dispatch(setActiveUser(user))
        dispatch(modalOpen())
    }

    let calificacionFiltrada = []

    resena?.filter(resena => resena?.estado !== false && moment(resena?.createdAt).format('M') === moment().format('M'))?.map(resena => {
        return (
            (resena?.calificacion?.filter(resena => resena?.id === id))
                &&
            calificacionFiltrada.push(resena?.calificacion?.filter(resena => resena?.id === id))
        )
    })
    
    let suma = 0
    let division = 0

    calificacionFiltrada?.map((calificacion) => {
        if (calificacion[0]?.id === id) {
            division += 1
        }
        return suma += calificacion[0]?.calificacion || 0
    })

    const usuarioCompleto = {
        ...props,
        calificacion: parseInt(suma/division) || 0,
        cantidad: division
    }

    // const capacitacionesFiltradasPorVideo = capacitacion?.filter(capacitacion => capacitacion?.video)

    const [ respWidth ] = useResponsive()

  return (
    <tr style={{cursor: 'pointer'}} onDoubleClick={() => handledActive(usuarioCompleto)} data-bs-toggle="tooltip" data-bs-placement="left" title="Haga doble click sobre un usuario para ver su detalle">
        {
            (respWidth > 992)
                &&
            <td className='d-flex justify-content-center'>
                <div className='d-flex justify-content-center my-3' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                    <img src={(urlImage) ? urlImage : user} className='img-fluid' alt="" />
                </div>
            </td>
        }
        <td>{name}</td>
        <td className='d-flex justify-content-center mx-auto'>
            <div className='d-flex justify-content-center' style={{width: '50px'}} data-bs-toggle="tooltip" data-bs-placement="left" title="3/10 cursos completados">
                <CircularProgressbar styles={buildStyles({pathColor: 'rgb(71, 7, 168)', textColor: 'rgb(71, 7, 168)', textSize: '30px'}) } value={10} text={`${10}%`} />
            </div>
        </td>
        <td data-bs-toggle="tooltip" data-bs-placement="left" title={`${division} Reseañas`}>{parseInt(suma/division) || 0}</td>
    </tr>
  )
}
