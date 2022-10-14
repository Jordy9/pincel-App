import React from 'react'
import { useSelector } from 'react-redux'
import { TableModalUserContent } from './TableModalUserContent'

export const TableModalUserSpreed = () => {
    const { capacitacion } = useSelector(state => state.cp)

    return (
        <>
            {
                (capacitacion)
                    &&
                    capacitacion?.map((evaluacion, index) => {
                        return (
                            (evaluacion?.team[index]?.value === 'Servicio')
                                &&
                            <TableModalUserContent key = {evaluacion?._id} {...evaluacion} />
                        )
                    })
            }
        </>
    )
}
