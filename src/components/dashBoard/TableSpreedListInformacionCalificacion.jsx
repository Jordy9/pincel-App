import React from 'react'
import { TableContentInformacionCalificacion } from './TableContentInformacionCalificacion'

export const TableSpreedListInformacionCalificacion = ({currentPage, calificacion, VideoComponent}) => {

    const PaginateCalificacion = () => {
        const allCalificacion = [...calificacion]
        return allCalificacion?.slice(currentPage, currentPage + 8)
    }

    return (
        <>
            {
                (calificacion)
                    &&
                    PaginateCalificacion()?.map(calificacion => {
                        return (
                            <TableContentInformacionCalificacion key = {calificacion?._id} {...calificacion} VideoComponent = {VideoComponent} />
                        )
                    })
            }
        </>
    )
}
