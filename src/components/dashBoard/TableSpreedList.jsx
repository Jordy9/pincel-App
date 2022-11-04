import React from 'react'
import { useSelector } from 'react-redux'
import { TableContent } from './TableContent'

export const TableSpreedList = ({usuarioFiltrado}) => {
    const { resenaFilterSlice } = useSelector(state => state.rs);
    const { evaluacionFilterSlice } = useSelector(state => state.ev);
    const { capacitacion } = useSelector(state => state.cp);

    let nuevosUsuarios = []

    usuarioFiltrado?.map(usuarios => {

        let calificacionFiltrada = []
        let suma = 0
        let division = 0
        let calificacionEvaluacion = []
        let calificacionFinalUsuario
        let sumaCalific = 0
        return (

            resenaFilterSlice?.filter(resena => resena?.estado !== false)?.map(resena => {
                return (
                    (resena?.calificacion?.filter(resena => resena?.id === usuarios?.id))
                        &&
                    calificacionFiltrada.push(resena?.calificacion?.filter(resena => resena?.id === usuarios?.id))
                )
            }),

            calificacionFiltrada?.map((calificacion) => {
                if (calificacion[0]?.id === usuarios?.id) {
                    division += 1
                }
                return suma += calificacion[0]?.calificacion || 0
            }),

            calificacionEvaluacion = evaluacionFilterSlice?.filter(evaluacion => capacitacion?.some(capacitacion => evaluacion?.idCapacitacion === capacitacion?._id && capacitacion?.publicar === true && capacitacion?.EvaluatShow === true) && evaluacion?.idUsuario === usuarios?.id),
            calificacionEvaluacion?.map(evC => sumaCalific = sumaCalific + evC?.calificacion),
            calificacionFinalUsuario = Number((sumaCalific / calificacionEvaluacion?.length)?.toFixed()) || 0,

            nuevosUsuarios.push({...usuarios, sumaPorcentage0: parseInt(suma/division) || 0, calificacionFinalUsuario: calificacionFinalUsuario, promedioGeneralDelUsuario: (calificacionFinalUsuario + parseInt(suma/division) || 0) / 2, division: division})
        )
    })

    const sortUsuarioCal = () => {
        return nuevosUsuarios?.sort((a, b) => b?.promedioGeneralDelUsuario - a?.promedioGeneralDelUsuario)
    }

    return (
        <>
            {
                (sortUsuarioCal())
                    &&
                    sortUsuarioCal()?.filter(usuarios => usuarios?.estado === true)?.map(usuario => {
                        return (
                            <TableContent key = {usuario?.id} {...usuario} />
                        )
                    })
            }
        </>
    )
}
