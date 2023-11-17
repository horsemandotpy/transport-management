import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Footer from '../../layout/Footer/Footer';
import PartnersTable from '../../components/Tables/PartnersTable/PartnersTable';
import { AddButton, PageTitle, PageWrapper, TitleBarWrapper, TitleWrapper } from '../../style/style';
import { Input, Modal } from 'antd';
import { InforLabelWrapper, ModalColumn, OptionInfoWrapper } from '../GoodsItem/goodsItemStyle';
import { ModalLocationColumn } from './partnersStyle';
import TextArea from 'antd/es/input/TextArea';

const Partners = () => {

    const numberpage = useSelector(state => state.filter.numberpage);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPost, setTotalPost] = useState(0)
    const [partnerData, setPartnerData] = useState([])
    const [searchByName, setSearchByName] = useState("")
    const [addPartnerModal, setAddPartnerModal] = useState(false)
    const [newPartner, setNewPartner] = useState()

    const getPartnersData = async () => {
        const response = await axios.get(`/api/doitacs?page=${currentPage}&search=${searchByName}&numberpage=${numberpage}`)
        setPartnerData(response.data.data)
        setTotalPost(response.data.count)
    }

    useEffect(() => {
        getPartnersData()
    }, [numberpage, currentPage, searchByName])

    const postNewPartner = async () => {
        await axios.post(`/api/doitacs`, newPartner)
        getPartnersData()
    }

    return (
        <PageWrapper>
            <Modal width={600} title={`Đối tác mới`} open={addPartnerModal} onCancel={() => {
                setAddPartnerModal(false)
            }} onOk={() => {
                postNewPartner()
                setAddPartnerModal(false)
            }}>
                <ModalColumn>
                    <InforLabelWrapper>
                        <span>Đối tác:</span>
                    </InforLabelWrapper>
                    <OptionInfoWrapper>
                        <ModalColumn>
                            <Input
                                onChange={(e) => {
                                    setNewPartner({
                                        ...newPartner,
                                        name: e.target.value
                                    })
                                }}
                                placeholder='Tên đối tác'
                            />
                        </ModalColumn>
                    </OptionInfoWrapper>
                </ModalColumn>

                <ModalColumn>
                    <InforLabelWrapper>
                        <span>Số điện thoại:</span>
                    </InforLabelWrapper>
                    <OptionInfoWrapper>
                        <ModalColumn>
                            <Input
                                onChange={(e) => {
                                    setNewPartner({
                                        ...newPartner,
                                        phone: e.target.value
                                    })
                                }}
                                placeholder='Số điện thoại'
                            />
                        </ModalColumn>
                    </OptionInfoWrapper>
                </ModalColumn>

                <ModalColumn>
                    <InforLabelWrapper>
                        <span>Phương tiện:</span>
                    </InforLabelWrapper>
                    <OptionInfoWrapper>
                        <ModalColumn>
                            <Input
                                onChange={(e) => {
                                    setNewPartner({
                                        ...newPartner,
                                        vehicle: e.target.value
                                    })
                                }}
                                placeholder='Phương tiện vận chuyển'
                            />
                        </ModalColumn>
                    </OptionInfoWrapper>
                </ModalColumn>

                <ModalColumn>
                    <InforLabelWrapper>
                        <span>Vận chuyển:</span>
                    </InforLabelWrapper>
                    <OptionInfoWrapper>
                        <ModalLocationColumn>

                            <Input
                                onChange={(e) => {
                                    setNewPartner({
                                        ...newPartner,
                                        transferFrom: e.target.value
                                    })
                                }}
                                placeholder='Từ'
                            />
                            <div> - </div>
                            <Input
                                onChange={(e) => {
                                    setNewPartner({
                                        ...newPartner,
                                        transferTo: e.target.value
                                    })
                                }}

                                placeholder='Đến'
                            />
                        </ModalLocationColumn>
                    </OptionInfoWrapper>
                </ModalColumn>

                <ModalColumn>
                    <InforLabelWrapper>
                        <span>Giá tiền:</span>
                    </InforLabelWrapper>
                    <OptionInfoWrapper>
                        <ModalLocationColumn>

                            <Input
                                onChange={(e) => {
                                    setNewPartner({
                                        ...newPartner,
                                        pricePerKg: +e.target.value
                                    })
                                }}
                                placeholder='0'
                                style={{
                                    width: "35%"
                                }}
                            />

                            <div>/Kg</div>
                        </ModalLocationColumn>

                        <ModalLocationColumn>

                            <Input
                                onChange={(e) => {
                                    setNewPartner({
                                        ...newPartner,
                                        pricePerPackage: +e.target.value
                                    })
                                }}
                                placeholder='0'
                                style={{
                                    width: "35%"
                                }}
                            />
                            <div>/Kiện</div>
                            <Input
                                onChange={(e) => {
                                    setNewPartner({
                                        ...newPartner,
                                        pricePerBigPackage: +e.target.value
                                    })
                                }}
                                placeholder='0'
                                style={{
                                    width: "35%"
                                }}
                            />
                            <div>/Kiện lớn</div>
                        </ModalLocationColumn>
                    </OptionInfoWrapper>
                </ModalColumn>

                <ModalColumn>
                    <InforLabelWrapper>
                        <span>Ghi chú</span>
                    </InforLabelWrapper>
                    <OptionInfoWrapper>
                        <TextArea onChange={(e) => {
                            setNewPartner({
                                ...newPartner,
                                note: e.target.value
                            })
                        }} />
                    </OptionInfoWrapper>
                </ModalColumn>

            </Modal>
            <TitleBarWrapper>
                <TitleWrapper>
                    <PageTitle>Danh sách đối tác</PageTitle>
                    <AddButton>
                        <i onClick={() => {
                            setNewPartner({})
                            setAddPartnerModal(true)
                        }} className="fa-solid fa-circle-plus"></i>
                    </AddButton>
                </TitleWrapper>
                <TitleWrapper>
                    <Input style={{
                        width: '500px'
                    }} placeholder='Tìm đối tác' onKeyDown={(e) => {
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
        </PageWrapper >

    )
}

export default Partners
