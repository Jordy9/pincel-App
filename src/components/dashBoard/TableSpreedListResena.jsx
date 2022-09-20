import React from 'react'
import { useSelector } from 'react-redux'
import { TableContentResena } from './TableContentResena'

export const TableSpreedListResena = ({setModalShowDetalle}) => {
    const { resenaFilterSlice } = useSelector(state => state.rs)

    const { activeUser } = useSelector(state => state.auth)

    // Si da error, solo hay que quitarle los parentesis a (resena.id === activeUser?.id)
    return (
        <>
            {
                (resenaFilterSlice)
                    &&
                    resenaFilterSlice?.map(resena => {
                        return (
                            (resena.calificacion.filter(resena => (resena.id === activeUser?.id) !== 0))
                                &&
                            <TableContentResena key = {resena?._id} {...resena} setModalShowDetalle = {setModalShowDetalle} />
                        )
                    })
            }
        </>
    )
}
