
import { FooterChildWrapper, FooterWrapper } from './footerStyle'

import PageSizeController from '../PageSizeController/PageSizeController';
import Pagination from '../Pagination/Pagination';




const Footer = ({ currentPage, setCurrentPage, totalPost }) => {


    return (
        <FooterWrapper>
            <FooterChildWrapper>
                <PageSizeController />
            </FooterChildWrapper>
            <FooterChildWrapper>
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPost={totalPost} />
            </FooterChildWrapper>
        </FooterWrapper>
    )
}

export default Footer
