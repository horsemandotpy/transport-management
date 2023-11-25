import { useEffect, useState } from 'react'
import { PageWrapper, TitleBarWrapper, TitleWrapper } from '../../style/style';
import Footer from '../../layout/Footer/Footer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CustomersTable from '../../components/Tables/CustomersTable/CustomersTable';

const Customers = () => {
    const numberpage = useSelector((state: any) => state.filter.numberpage);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPost, setTotalPost] = useState(0)
    const [customersData, setCustomersData] = useState([])
    const [searchByName, setSearchByName] = useState("")


    const getCustomersData = async () => {
        const response = await axios.get(`/api/khachhangs?page=${currentPage}&numberpage=${numberpage}&search=${searchByName}`)
        setCustomersData(response.data.data)
        setTotalPost(response.data.count)
    }

    useEffect(() => {
        getCustomersData();
    }, [numberpage, currentPage, searchByName])

    return (
        <PageWrapper>
            <TitleBarWrapper>
                <TitleWrapper>
                    <PageWrapper>Danh sách khách hàng</PageWrapper>
                </TitleWrapper>
                <TitleWrapper>
                    <input placeholder='Tìm khách hàng' onKeyDown={(e: any) => {
                        if (e.key === "Enter") {
                            setSearchByName(e.target.value);
                        }
                    }} />
                </TitleWrapper>
            </TitleBarWrapper>

            <CustomersTable customersData={customersData} />

            <Footer
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPost={totalPost}
            />
        </PageWrapper>
    )
}

export default Customers
