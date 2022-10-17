import React from 'react'
import { TableModalUserContent } from './TableModalUserContent'

export const TableModalUserSpreed = ({capacitacionTOList}) => {

    return (
        <>
            {
                (capacitacionTOList)
                    &&
                    capacitacionTOList?.map((evaluacion, index) => {
                        return (
                            <TableModalUserContent key = {evaluacion?._id} {...evaluacion} />
                        )
                    })
            }
        </>
    )
}
