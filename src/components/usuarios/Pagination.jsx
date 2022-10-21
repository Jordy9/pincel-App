import React from 'react'
import ReactPaginate from 'react-paginate';

export const Pagination = ({setCurrentPage, usuariosFiltro}) => {

    const total = Math.ceil(usuariosFiltro?.length/25)

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 25) % Math.ceil(usuariosFiltro?.length);

        setCurrentPage(newOffset)
    };

    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel="Siguiente"
                onPageChange={handlePageClick}
                pageRangeDisplayed={25}
                pageCount={(total) ? total : 1}
                previousLabel="Anterior"
                containerClassName='pagination justify-content-center'
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                activeClassName='active'
                initialPage={0}
            />
        </>
    )
}
