import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { useResponsive } from '../../hooks/useResponsive';

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

    const [ respWidth ] = useResponsive();

    return (
        <div>
            <ReactPaginate
                breakLabel="..."
                nextLabel={ ( respWidth > 991 ) ? "Siguiente" : <i className="bi bi-arrow-right-circle-fill"></i> }
                onPageChange={handlePageClick}
                pageRangeDisplayed={ ( respWidth > 991 ) ? changeNumber : 0.5}
                pageCount={(total) ? total : 1}
                previousLabel={ ( respWidth > 991 ) ? "Anterior" : <i className="bi bi-arrow-left-circle-fill"></i> }
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
        </div>
    )
}
