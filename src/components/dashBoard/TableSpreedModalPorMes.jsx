import React from 'react'
import { TableContentResena } from './TableContentResena'
import { TableContentResenaPorMes } from './TableContentResenaPorMes'

export const TableSpreedModalPorMes = ({setModalShowDetalle, currentPage, resenaFilterSlice}) => {

    const PaginateResena = () => {
        const allResena = [...resenaFilterSlice]
        return allResena?.slice(currentPage, currentPage + 25)
    }

    // Si da error, solo hay que quitarle los parentesis a (resena.id === activeUser?.id)
    return (
        <>
            {
                (resenaFilterSlice)
                    &&
                    PaginateResena()?.map(resena => {
                        return (
                            <TableContentResenaPorMes key = {resena?._id} {...resena} setModalShowDetalle = {setModalShowDetalle} />
                        )
                    })
            }
        </>
    )
}
