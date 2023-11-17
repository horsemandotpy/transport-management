import { Outlet, useParams } from 'react-router-dom'
import TabNavigation from '../../components/TabNavigation/TabNavigation'
import { PageTitle, PageWrapper, TitleBarWrapper } from '../../style/style'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ContentBottomWrapper, ContentTopWrapper, DebtNumber, InfoButtonWrapper, Infor40, Infor60, InforLabelWrapper, ModalColumn, ModalInfoColumn, ModalInnerContentBox, ModalInnerContentTop, ModalLocationColumn, ModalWrapper, OptionInfoWrapper } from './partnerItemStyle';
import { useDispatch, useSelector } from 'react-redux';
import { storeSetPartner } from '../../store/filter-reducer';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import InforModalButton from '../../components/Button/InforModalButton/InforModalButton';
import BlueButton from '../../components/Button/BlueButton/BlueButton';
import { Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const PartnerItem = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [editLoading, setEditLoading] = useState(false)
    const [inforModal, setInforModal] = useState(false)
    const [editInforModal, setEditInforModal] = useState(false)
    const [blockModal, setBlockModal] = useState(false)
    const [newPartner, setNewPartner] = useState()

    const dispatch = useDispatch()
    const partner = useSelector(state => state.filter.partner);

    const tabNavigationOptions = [
        {
            name: "Tiến trình vận chuyển",
            path: `/partners/${id}/progress`
        },
        {
            name: "Lịch sử thanh toán",
            path: `/partners/${id}/payment`
        }
    ]

    const getPartnerInfor = async (id) => {
        const data = await axios.get(`/api/doitacs/${id}`)
        dispatch(storeSetPartner(data.data))
        setNewPartner(data.data)
        setIsLoading(false)
    }

    const postEditPartnerInfor = async (id) => {
        setEditLoading(true)
        await axios.post(`/api/doitacs/${id}`, newPartner)
        const newData = await axios.get(`/api/doitacs/${id}`)
        dispatch(storeSetPartner(newData.data))
        setNewPartner(newData.data)
        setEditLoading(false)
    }

    useEffect(() => {
        getPartnerInfor(id)
    }, [])

    return (
        <>
            {isLoading && <LoadingScreen message={`Loading...`} />}
            {editLoading && <LoadingScreen message={`Đang sửa dữ liệu...`} />}

            {!isLoading &&
                <PageWrapper>
                    <Modal title="Bạn có muốn khóa đối tác này không ?" open={blockModal} onCancel={() => {
                        setBlockModal(false)
                    }}>

                    </Modal>

                    <Modal width={600} title={`Đối tác mới`} open={editInforModal} onCancel={() => {
                        setEditInforModal(false)
                    }} onOk={() => {
                        postEditPartnerInfor(id)
                        setEditInforModal(false)
                    }}>
                        <ModalColumn>
                            <InforLabelWrapper>
                                <span>Đối tác:</span>
                            </InforLabelWrapper>
                            <OptionInfoWrapper>
                                <ModalColumn>
                                    <Input
                                        value={newPartner.name}
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
                                        value={newPartner.phone}
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
                                        value={newPartner.vehicle}
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
                                        value={newPartner.transferFrom}
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
                                        value={newPartner.transferTo}
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
                                        value={newPartner.pricePerKg}
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
                                        value={newPartner.pricePerPackage}
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
                                        value={newPartner.pricePerBigPackage}
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
                                <TextArea
                                    value={newPartner.note}
                                    onChange={(e) => {
                                        setNewPartner({
                                            ...newPartner,
                                            note: e.target.value
                                        })
                                    }} />
                            </OptionInfoWrapper>
                        </ModalColumn>

                    </Modal>

                    <TitleBarWrapper>
                        <PageTitle>
                            {`Đối tác:${partner.name} `}
                            (<DebtNumber negaposi={partner.debt > 0}>{partner.debt} VNĐ </DebtNumber>)
                            {" "}
                            <InfoButtonWrapper>
                                <InforModalButton setOpenModalInfo={setInforModal} />
                                {inforModal &&
                                    <ModalWrapper onClick={() => {
                                        setInforModal(false)
                                    }}>
                                        <ModalInnerContentBox>
                                            <ModalInnerContentTop>
                                                <ContentTopWrapper>
                                                    <ModalInfoColumn>
                                                        <Infor40>
                                                            Số điện thoại:
                                                        </Infor40>
                                                        <Infor60>
                                                            {partner.phone}
                                                        </Infor60>
                                                    </ModalInfoColumn>
                                                    <ModalInfoColumn>
                                                        <Infor40>
                                                            Vận chuyển từ - đến:                                                    </Infor40>
                                                        <Infor60>
                                                            {partner.transferFrom} - {partner.transferTo}
                                                        </Infor60>
                                                    </ModalInfoColumn>
                                                    <ModalInfoColumn>
                                                        <Infor40>
                                                            Tỉ giá (VND):
                                                        </Infor40>
                                                        <Infor60>
                                                            <p>{partner.pricePerKg}/kg</p>
                                                            <p>{partner.pricePerPackage}/Kiện</p>
                                                            <p>{partner.pricePerBigPackage}/Kiện lớn</p>
                                                        </Infor60>
                                                    </ModalInfoColumn>
                                                    <ModalInfoColumn>
                                                        <Infor40>
                                                            Trạng thái:
                                                        </Infor40>
                                                        <Infor60>
                                                            {partner.blocked ? "NO" : "Đang làm việc"}
                                                        </Infor60>
                                                    </ModalInfoColumn>
                                                    <ModalInfoColumn>
                                                        <Infor40>
                                                            Ghi chú:
                                                        </Infor40>
                                                        <Infor60>
                                                            {partner.note}
                                                        </Infor60>
                                                    </ModalInfoColumn>
                                                </ContentTopWrapper>
                                                <ContentBottomWrapper>
                                                    <BlueButton setOpenModal={setEditInforModal} name={"Sửa"} />
                                                    <BlueButton setOpenModal={setBlockModal} name={"Khóa"} />
                                                </ContentBottomWrapper>
                                            </ModalInnerContentTop>

                                        </ModalInnerContentBox>
                                    </ModalWrapper>}
                            </InfoButtonWrapper>
                        </PageTitle>
                    </TitleBarWrapper>
                    <hr />
                    <TabNavigation tabNavigationOptions={tabNavigationOptions} />
                    <Outlet />

                </PageWrapper>}
        </>

    )
}

export default PartnerItem
