import React from 'react'
import { TableModalUserContent } from './TableModalUserContent'

export const TableModalUserSpreed = ({capacitacionTOList, currentPage}) => {

    const PaginateCapacitacion = () => {
        const allCapacitacion = [...capacitacionTOList]
        return allCapacitacion?.slice(currentPage, currentPage + 8)
    }

    return (
        <>
            {
                (capacitacionTOList)
                    &&
                    PaginateCapacitacion()?.map((evaluacion, index) => {
                        return (
                            <TableModalUserContent key = {evaluacion?._id} {...evaluacion} />
                        )
                    })
            }
        </>
    )
}
