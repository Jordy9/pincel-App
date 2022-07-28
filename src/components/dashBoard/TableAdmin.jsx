import React from 'react'
import { ModalUser } from './ModalUser'
import { TableSpreedList } from './TableSpreedList';
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useResponsive } from '../../hooks/useResponsive';

export const TableAdmin = () => {

    const [respWidth] = useResponsive()

    const percentage = 66;

  return (
    <>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 col-xxl-2 shadow p-4 d-flex justify-content-center align-items-center my-2" style={{height: 'auto', borderRadius: '35px'}}>
            <div data-bs-toggle="tooltip" data-bs-placement="left" title="Porcentage de capacitaciones generales">
                <CircularProgressbar styles={buildStyles({pathColor: 'rgb(71, 7, 168)', textColor: 'rgb(71, 7, 168)',})} value={percentage} text={`${percentage}%`} />
                <h6 className='text-center my-1'>Promedio de las capacitaciones en curso</h6>
            </div>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 col-xxl-10 my-2">
            <div className='table-responsive shadow p-4' style={{borderTopLeftRadius: '35px', borderBottomLeftRadius: '35px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: '300px'}}>
                <table className="table borderless">
                    <thead>
                        <tr>
                            <th scope="col">Foto</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Promedio de las evaluaciones</th>
                            <th scope="col">Promedio de las reseñas</th>
                            <th scope="col">Capacitaciones en curso</th>
                            <th scope="col">Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableSpreedList />
                    </tbody>
                </table>
            </div>
        </div>

        
        <ModalUser />
    </>
  )
}
