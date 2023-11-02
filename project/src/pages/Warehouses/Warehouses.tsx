import { useSelector } from 'react-redux';
import Footer from '../../layout/Footer/Footer';
import { PageWrapper, TitleBarWrapper, TitleWrapper } from '../../style/style'
import WarehousesTable from '../../components/Tables/WarehousesTable/WarehousesTable';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Warehouses = () => {
  const numberpage = useSelector(state => state.filter.numberpage);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPost, setTotalPost] = useState(0)
  const [warehousesData, setWarehousesData] = useState([])
  const [searchByName, setSearchByName] = useState("")

  const getWarehousesData = async () => {
    const response = await axios.get(`/api/chukhos?page=${currentPage}&search=${searchByName}&numberpage=${numberpage}`)
    setWarehousesData(response.data.data)
    setTotalPost(response.data.count)
  }

  useEffect(() => {
    getWarehousesData()
  }, [numberpage, currentPage, searchByName])

  return (
    <PageWrapper>
      <TitleBarWrapper>
        <TitleWrapper>
          <PageWrapper>Danh sách kho</PageWrapper>
        </TitleWrapper>
        <TitleWrapper>
          <input placeholder='Tìm kho' onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchByName(e.target.value);
            }
          }} />
        </TitleWrapper>
      </TitleBarWrapper>

      <WarehousesTable warehousesData={warehousesData} />

      <Footer
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPost={totalPost}
      />
    </PageWrapper>
  )
}

export default Warehouses
