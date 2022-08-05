import React from 'react'
import { useSelector } from 'react-redux'
import { TableContent } from './TableContent'

export const TableSpreedList = () => {
    const { capacitacion } = useSelector(state => state.cp)

    return (
        <>
            {
                (capacitacion)
                    &&
                    capacitacion?.map(capacitacion => {
                        return (
                            <TableContent key = {capacitacion?._id} {...capacitacion} />
                        )
                    })
            }
        </>
    )
}
