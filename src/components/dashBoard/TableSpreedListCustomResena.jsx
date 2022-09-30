import React from 'react'
import { useSelector } from 'react-redux'
import { TableContentCustomResena } from './TableContentCustomResena'

export const TableSpreedListCustomResena = () => {
    const { customResenaFilterSlice } = useSelector(state => state.cr)
    return (
        <>
            {
                (customResenaFilterSlice)
                    &&
                    customResenaFilterSlice?.map(resena => {
                        return (
                            <TableContentCustomResena key = {resena?._id} {...resena} />
                        )
                    })
            }
        </>
    )
}
