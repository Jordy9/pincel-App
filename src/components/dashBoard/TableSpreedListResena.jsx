import React from 'react'
import { useSelector } from 'react-redux'
import { TableContentResena } from './TableContentResena'

export const TableSpreedListResena = ({setModalShowDetalle}) => {
    const { resena } = useSelector(state => state.rs)

    const { activeUser } = useSelector(state => state.auth)
    return (
        <>
            {
                (resena)
                    &&
                    resena?.map(resena => {
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
