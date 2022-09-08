import React from 'react'
import { useSelector } from 'react-redux'
import { TableContent } from './TableContent'

export const TableSpreedList = () => {
    const { usuarios, uid } = useSelector(state => state.auth)
    return (
        <>
            {
                (usuarios)
                    &&
                    usuarios?.filter(usuarios => usuarios?.id !== uid && !usuarios?.name?.includes('Jordy') && !usuarios?.name?.includes('Mariela') && !usuarios?.name?.includes('Lorena'))?.map(usuario => {
                        return (
                            <TableContent key = {usuario?.id} {...usuario} />
                        )
                    })
            }
        </>
    )
}
