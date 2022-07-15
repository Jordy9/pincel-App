import React from 'react'
import { useSelector } from 'react-redux'
import { QuestionList } from './QuestionList'

export const TableSpreedList = () => {
    const { usuarios } = useSelector(state => state.auth)
    return (
        <>
            {
                (usuarios)
                    &&
                    usuarios?.map(pregunta => {
                        return (
                            <QuestionList key = {pregunta._id} {...pregunta} />
                        )
                    })
            }
        </>
    )
}
