import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeCapacitacion } from '../../store/capacitacion/capacitacionSlice';

export const Sidebar = () => {

    const dispatch = useDispatch();

    const { capacitacion, capacitacionActiva } = useSelector(state => state.cp);

    const { uid } = useSelector(state => state.auth);

    const capacitacionId = window.location.pathname.split('/')[2]

    const capacitacionFiltrada = capacitacion?.filter(capacitacion => capacitacion?._id === capacitacionId)

    console.log(capacitacionFiltrada[0]?.video)
    
  return (
    <div style={{width: '100%', height: '100vh'}}>
        <h4 className='text-center p-1'>Contenido de la capacitacion</h4>
        {
            capacitacionFiltrada[0]?.video?.map((capacitacion, index) => {
                const duracion = parseInt(capacitacion.duration / 60)
                return (
                    <div onClick={() => dispatch(activeCapacitacion(capacitacion))} className={`row p-2 sidebarCapacitacion ${(capacitacionActiva === capacitacion) && 'sidebarCapacitacionfocus'}`} key={capacitacion?._id}>
                        <div className="col-2 d-flex justify-content-center">
                            {
                                (capacitacion?.check?.includes(uid))
                                   &&
                                <input defaultChecked = {true} type="checkbox" className='form-check-input' />
                            }

                            {
                                (!capacitacion?.check?.includes(uid))
                                   &&
                                <input defaultChecked = {false} type="checkbox" className='form-check-input' />
                            }
                        </div>

                        <div className="col-10">
                            <span>{index + 1}. {capacitacion?.titulo}</span>
                            <caption style={{fontSize: '13px'}}>{(duracion < 1) ? 1 : duracion}min</caption>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}
