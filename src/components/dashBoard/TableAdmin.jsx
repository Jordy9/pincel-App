import React from 'react'
import { ModalUser } from './ModalUser'
import { TableSpreedList } from './TableSpreedList';
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useResponsive } from '../../hooks/useResponsive';
import { TableSpreedListCustomResena } from './TableSpreedListCustomResena';
import { useSelector } from 'react-redux';

export const TableAdmin = ({usuarioFiltrado, toShowResena, changeShowResena}) => {

    const [ respWidth ] = useResponsive()

    const { evaluacion } = useSelector(state => state.ev);

    const { capacitacion } = useSelector(state => state.cp);

    let sumaPorcentage = []

    let sumaPorcentageIncompleto = []

    let sumaPorcentageCompleto = []

    const cap = capacitacion?.filter(
        capacitacion => capacitacion?.publicar === true
            &&
        capacitacion?.team?.some(team => usuarioFiltrado?.some(usuario => (team?.value === usuario?.team) && capacitacion))
    )

    usuarioFiltrado?.filter(usuario => usuario?.estado === true)?.map(usuario => {

        const CantidadCheck = cap?.filter(capacitacion => capacitacion?.video?.some(video => video?.check?.some(check => check?.id === usuario?.id)))

        let video = []

        let checkVideo = []

        CantidadCheck?.map(videos => video?.push(...videos?.video))

        video?.map(video => video?.check?.some(check => check?.id === usuario?.id && checkVideo.push(video)))

        const evaluacionFilt = evaluacion?.filter(evaluacion => usuario?.estado === true && evaluacion?.idUsuario === usuario?.id && capacitacion?.some(capacitacion => capacitacion?.publicar === true && (evaluacion?.idCapacitacion === capacitacion?._id || !capacitacion?.EvaluatShow) && capacitacion?.team?.some(team => team?.value === usuario?.team)))

        let sumaCantVideos = 0

        cap?.map(capacitacion => sumaCantVideos = sumaCantVideos + capacitacion?.video?.length)

        const porcentaje = parseInt((checkVideo?.length / sumaCantVideos) * 100) || 0

        const porcentajeFinal = parseInt(checkVideo?.length * 100) || 0

        return (
            (porcentaje === 100 && (evaluacionFilt?.length !== 0)) ? sumaPorcentage.push(porcentajeFinal) : sumaPorcentageIncompleto.push(porcentajeFinal)
        )

    })

    // capacitacionFilterSlice?.filter(
    //     capacitacion => capacitacion?.publicar === true
    //   )?.map(({video, _id, EvaluatShow, team}) => {
    //     const CantidadCheck = video?.filter(video => usuarioFiltrado?.some(usuario => video?.check?.includes(usuario?.id)))
    
    //     const evaluacionFilt = evaluacion?.filter(evaluacion => usuarioFiltrado?.some(usuario => usuario?.estado === true && evaluacion?.idUsuario === usuario?.id) && evaluacion?.idCapacitacion === _id)
    
    //     const porcentaje = parseInt((CantidadCheck?.length / video?.length) * 100) || 0

    //     return (
    //       (porcentaje === 100 && (evaluacionFilt?.length !== 0 || !EvaluatShow)) ? sumaPorcentage.push(porcentaje) : sumaPorcentageIncompleto.push(porcentaje)
    //     )
    //   })

    sumaPorcentageCompleto = [...sumaPorcentageIncompleto, ...sumaPorcentage]

    let suma = 0

    sumaPorcentageCompleto?.map(calificacion => suma = suma + calificacion)

    const usuariosFilt = usuarioFiltrado?.filter(usuario => usuario?.estado === true)

    const sumaPromedioCapacitaciones = (suma / ((cap?.length*usuariosFilt?.length)*100)) * 100 || 0

    //   console.log(suma, ((capacitacionFilterSlice?.length*usuariosFilt?.length)*100) * 100)

    const sumaTotalCompletasPorUsuarios = (cap?.length*sumaPromedioCapacitaciones)/100 || 0

    let showDecimal = (sumaTotalCompletasPorUsuarios === cap?.length)

    //   console.log(sumaTotal)

    //   const sumaPromedioCapacitaciones = (sumaPorcentage?.length/capacitacionFilterSlice?.length) * 100 || 0

  return (
    <>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 col-xxl-2 shadow p-4 d-flex justify-content-center align-items-center my-2" style={{height: 'auto', borderRadius: '35px'}}>
            <div data-bs-toggle="tooltip" data-bs-placement="left" title={`${sumaTotalCompletasPorUsuarios?.toFixed(!showDecimal && 1)}/${cap?.length} capacitaciones completadas`}>
                <CircularProgressbar styles={buildStyles({pathColor: 'rgb(71, 7, 168)', textColor: 'rgb(71, 7, 168)',})} value={sumaPromedioCapacitaciones?.toFixed(!showDecimal && 1)} text={`${sumaPromedioCapacitaciones?.toFixed(!showDecimal && 1)}%`} />
                <h6 className='text-center my-1'>Promedio de las capacitaciones completas</h6>
            </div>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 col-xxl-10 my-2">
            <div className='table-responsive shadow pt-4 pb-4' style={{borderTopLeftRadius: '35px', borderBottomLeftRadius: '35px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: '300px'}}>

                {
                    (changeShowResena === 'Normal')
                        ?
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
                                <th scope="col">Promedio general</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableSpreedList usuarioFiltrado = {usuariosFilt} />
                        </tbody>
                    </table>
                        :
                    <table className="table borderless">
                        <thead>
                            <tr>
                                <th scope="col">Titulo</th>
                                <th scope="col">Calificación</th>
                                <th scope="col">Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableSpreedListCustomResena />
                        </tbody>
                    </table>
                }
            </div>
        </div>

        
        <ModalUser />
    </>
  )
}
