import React from 'react'
import { useSelector } from 'react-redux'
import { TableContent } from './TableContent'

export const TableSpreedList = ({usuariosFiltro}) => {
    const { usuarios } = useSelector(state => state.auth)

    return (
        <>
            {
                (usuarios)
                    &&
                    usuariosFiltro?.map(usuario => {
                        return (
                            <TableContent key = {usuario?.id} {...usuario} />
                        )
                    })
            }
        </>
    )
}
