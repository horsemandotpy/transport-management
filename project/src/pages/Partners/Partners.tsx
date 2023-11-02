import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Footer from '../../layout/Footer/Footer';
import PartnersTable from '../../components/Tables/PartnersTable/PartnersTable';
import { PageTitle, PageWrapper, TitleBarWrapper, TitleWrapper } from '../../style/style';

const Partners = () => {

    const numberpage = useSelector(state => state.filter.numberpage);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPost, setTotalPost] = useState(0)
    const [partnerData, setPartnerData] = useState([])
    const [searchByName, setSearchByName] = useState("")

    const getPartnersData = async () => {
        const response = await axios.get(`/api/doitacs?page=${currentPage}&search=${searchByName}&numberpage=${numberpage}`)
        setPartnerData(response.data.data)
        setTotalPost(response.data.count)
    }

    useEffect(() => {
        getPartnersData()
    }, [numberpage, currentPage, searchByName])

    return (
        <PageWrapper>

            <TitleBarWrapper>
                <TitleWrapper>
                    <PageTitle>Danh sách đối tác</PageTitle>
                </TitleWrapper>
                <TitleWrapper>
                    <input placeholder='Tìm đối tác' onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setSearchByName(e.target.value);
                        }
                    }} />
                </TitleWrapper>
            </TitleBarWrapper>

            <PartnersTable partnerData={partnerData} />

            <Footer
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPost={totalPost}
            />
        </PageWrapper>

    )
}

export default Partners
