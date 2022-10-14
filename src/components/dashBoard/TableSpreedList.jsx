import React from 'react'
import { useSelector } from 'react-redux'
import { TableContent } from './TableContent'

export const TableSpreedList = ({usuarioFiltrado}) => {
    const { usuarios, uid } = useSelector(state => state.auth)
    return (
        <>
            {
                (usuarios)
                    &&
                    usuarioFiltrado?.filter(usuarios => usuarios?.id !== uid && usuarios?.estado === true)?.map(usuario => {
                        return (
                            <TableContent key = {usuario?.id} {...usuario} />
                        )
                    })
            }
        </>
    )
}
