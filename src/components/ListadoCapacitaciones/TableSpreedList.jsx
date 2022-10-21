import React from 'react'
import { TableContent } from './TableContent'

export const TableSpreedList = ({capacitacion, currentPage}) => {

    const PaginateResena = () => {
        const allResena = [...capacitacion]
        return allResena?.slice(currentPage, currentPage + 25)
    }

    return (
        <>
            {
                (capacitacion)
                    &&
                    PaginateResena()?.map(capacitacion => {
                        return (
                            <TableContent key = {capacitacion?._id} {...capacitacion} />
                        )
                    })
            }
        </>
    )
}
