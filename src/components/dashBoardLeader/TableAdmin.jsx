import React from 'react'
import { ModalUser } from './ModalUser'
import { TableSpreedList } from './TableSpreedList';
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useResponsive } from '../../hooks/useResponsive';
import { useSelector } from 'react-redux';

export const TableAdmin = ({usuarioFiltrado, toShowResena, changeShowResena}) => {

    const percentage = 66;

    const [ respWidth ] = useResponsive()

    const { evaluacion } = useSelector(state => state.ev);

    const { capacitacionFilterSlice } = useSelector(state => state.cp);

    let sumaPorcentage = []

    let sumaPorcentageIncompleto = []

    let sumaCompleta = []

    capacitacionFilterSlice?.filter(
        capacitacion => capacitacion?.publicar === true 
      )?.map(({video, _id, EvaluatShow, team}) => {
        const CantidadCheck = video?.filter(video => usuarioFiltrado?.some(usuario => video?.check?.includes(usuario?.id)))
    
        const evaluacionFilt = evaluacion?.filter(evaluacion => usuarioFiltrado?.some(usuario => usuario?.estado === true && evaluacion?.idUsuario === usuario?.id) && evaluacion?.idCapacitacion === _id)
    
        const porcentaje = parseInt((CantidadCheck[0]?.check?.length / usuarioFiltrado?.length) * 100) || 0

        return (
          (porcentaje === 100 && (evaluacionFilt?.length !== 0 || !EvaluatShow)) ? sumaPorcentage.push(porcentaje) : sumaPorcentageIncompleto.push(porcentaje)
        )
    })

    sumaCompleta = [...sumaPorcentageIncompleto, ...sumaPorcentage]

    let suma = 0

    sumaCompleta?.map(calificacion => suma = suma + calificacion)

    const sumaPromedioCapacitaciones = (suma / (capacitacionFilterSlice?.length*100)) * 100 || 0

  return (
    <>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 col-xxl-2 shadow p-4 d-flex justify-content-center align-items-center my-2" style={{height: 'auto', borderRadius: '35px'}}>
            <div data-bs-toggle="tooltip" data-bs-placement="left" title={`${sumaPorcentage?.length}/${capacitacionFilterSlice?.length} capacitaciones completadas`}>
                <CircularProgressbar styles={buildStyles({pathColor: 'rgb(71, 7, 168)', textColor: 'rgb(71, 7, 168)',})} value={sumaPromedioCapacitaciones?.toFixed(1)} text={`${sumaPromedioCapacitaciones?.toFixed(1)}%`} />
                <h6 className='text-center my-1'>Promedio de las capacitaciones completas</h6>
            </div>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 col-xxl-10 my-2">
            <div className='table-responsive shadow p-4' style={{borderTopLeftRadius: '35px', borderBottomLeftRadius: '35px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: '300px'}}>
                <table className="table borderless">
                    <thead>
                        <tr>
                            {
                                (respWidth > 992)
                                    &&
                                <th scope="col">Foto</th>
                            }
                            <th scope="col">Nombre</th>
                            <th scope="col">Promedio de las evaluaciones</th>
                            <th scope="col">Promedio de las reseñas</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableSpreedList usuarioFiltrado = {usuarioFiltrado} />
                    </tbody>
                </table>
            </div>
        </div>

        
        <ModalUser />
    </>
  )
}
