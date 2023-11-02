
import { useSelector } from 'react-redux'
import { PaginationItem, PaginationWrapper } from './paginationStyle'

const Pagination = ({ currentPage, setCurrentPage, totalPost }) => {
    const numberpage = useSelector(state => state.filter.numberpage);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPost / numberpage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            {pageNumbers.length > 1 && (
                <PaginationWrapper>
                    <PaginationItem onClick={() => {
                        setCurrentPage(1)
                    }}><i className="fa-solid fa-angles-left"></i></PaginationItem>
                    <PaginationItem onClick={() => {
                        if (currentPage > 1) {
                            setCurrentPage(curr => curr - 1)
                        }
                    }}><i className="fa-solid fa-chevron-left"></i></PaginationItem>
                    {pageNumbers.length >= 5 && currentPage > 3 && (<PaginationItem onClick={() => {
                        setCurrentPage(curr => curr - 3)
                    }}>...</PaginationItem>)}
                    {currentPage > 3 ?
                        (pageNumbers.slice(currentPage - 3, currentPage + 2).map(number => (
                            <PaginationItem key={number} onClick={() => {
                                console.log(number)
                                setCurrentPage(number);
                            }} className={currentPage === number ? `active-page` : ""}>{number}</PaginationItem>
                        ))) : (pageNumbers.slice(0, currentPage + 2).map(number => (
                            <PaginationItem key={number} onClick={() => {
                                console.log(number)
                                setCurrentPage(number);
                            }} className={currentPage === number ? `active-page` : ""}>{number}</PaginationItem>
                        )))}
                    {pageNumbers.length >= 3 && currentPage <= pageNumbers.length - 5 && (<PaginationItem onClick={() => {
                        setCurrentPage(curr => curr + 5)
                    }}>...</PaginationItem>)}
                    <PaginationItem onClick={() => {
                        if (currentPage < pageNumbers.length)
                            setCurrentPage(curr => curr + 1)
                    }}><i className="fa-solid fa-chevron-right"></i></PaginationItem>
                    <PaginationItem onClick={() => {
                        setCurrentPage(pageNumbers.length)
                    }}><i className="fa-solid fa-angles-right"></i></PaginationItem>
                </PaginationWrapper>
            )}
        </>

    )
}

export default Pagination
