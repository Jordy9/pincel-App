import React from 'react'
import { useSelector } from 'react-redux'
import { TableContent } from './TableContent'

export const TableSpreedList = ({usuariosFiltro, currentPage, noshow}) => {
    const { usuarios } = useSelector(state => state.auth)

    const PaginateUsers = () => {
        const allUsers = [...usuariosFiltro,]
        return allUsers?.slice(currentPage, currentPage + 25)
    }

    return (
        <>
            {
                (usuarios)
                    &&
                    PaginateUsers()?.filter(usuario => (noshow) ? usuario?.estado === true : usuario)?.map(usuario => {
                        return (
                            <TableContent key = {usuario?.id} {...usuario} />
                        )
                    })
            }
        </>
    )
}
