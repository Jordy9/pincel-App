import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';

export const Pagination = ({setCurrentPage, usuariosFiltro, changeNumber = 25, element}) => {

    const total = Math.ceil(usuariosFiltro?.length/changeNumber)

    const [changePage, setChangePage] = useState(0)

    const handlePageClick = (event) => {
        const newOffset = (event.selected * changeNumber) % Math.ceil(usuariosFiltro?.length);

        setCurrentPage(newOffset)

        setChangePage(newOffset)
    };

    useEffect(() => {
        if (changeNumber === 8) {
            window.scrollTo(0, 0);
        } else {
            element?.scrollIntoView({behavior: "smooth", block: "start"})
        }
    }, [changePage, element, changeNumber]);

    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel="Siguiente"
                onPageChange={handlePageClick}
                pageRangeDisplayed={changeNumber}
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
