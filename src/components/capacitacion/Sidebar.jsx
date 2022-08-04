import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeCapacitacion } from '../../store/capacitacion/capacitacionSlice';

export const Sidebar = () => {

    const dispatch = useDispatch();

    const { capacitacion, capacitacionActiva } = useSelector(state => state.cp);

    const { uid } = useSelector(state => state.auth);

    const capacitacionId = window.location.pathname.split('/')[2]
    
  return (
    <div style={{width: '100%', height: '100vh'}}>
        <h4 className='text-center p-1'>Contenido de la capacitacion</h4>
            {
                capacitacion?.filter(capacitacion => capacitacion?._id === capacitacionId)?.map(capacitacion => {
                    return (
                        capacitacion?.video?.map((capacitacion, index) => {
                            const duracion = parseInt(capacitacion.duration / 60)
                            return (
                                <div onClick={() => dispatch(activeCapacitacion(capacitacion))} className={`row p-2 sidebarCapacitacion ${(capacitacionActiva === capacitacion) && 'sidebarCapacitacionfocus'}`} key={capacitacion}>
                                    <div className="col-2 d-flex justify-content-center">
                                        <input defaultChecked = {(capacitacion?.check?.includes(uid))} type="checkbox" className='form-check-input' />
                                    </div>

                                    <div className="col-10">
                                        <span>{index + 1}. {capacitacion?.titulo}</span>
                                    <caption style={{fontSize: '13px'}}>{(duracion < 1) ? 1 : duracion}min</caption>
                                    </div>
                                </div>
                            )
                        })
                    )
                })
            }
                {/* <>
                <div className='p-4 sidebarCapacitacion' style={{justifyContent: 'space-between', display: 'flex'}}>
                    <div>
                        <input type="checkbox" className='form-check-input' />
                    </div>
                    <div className="col-11">
                    <div>
                        <span>{capacitacion?.titulo}</span>
                    </div>
                    </div>
                
                    <caption style={{fontSize: '13px'}}>2h 5min</caption>
                </div>
                </> */}
    </div>
  )
}
