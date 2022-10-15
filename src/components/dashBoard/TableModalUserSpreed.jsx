import React from 'react'
import { useSelector } from 'react-redux'
import { TableModalUserContent } from './TableModalUserContent'

export const TableModalUserSpreed = () => {
    const { capacitacion } = useSelector(state => state.cp)

    const { activeUser } = useSelector(state => state.auth)

    return (
        <>
            {
                (capacitacion)
                    &&
                    capacitacion?.filter(evaluacion => evaluacion?.publicar === true && evaluacion?.team?.some(team => team?.value === activeUser?.team || team?.value === activeUser?.id))?.map((evaluacion, index) => {
                        return (
                            <TableModalUserContent key = {evaluacion?._id} {...evaluacion} />
                        )
                    })
            }
        </>
    )
}
