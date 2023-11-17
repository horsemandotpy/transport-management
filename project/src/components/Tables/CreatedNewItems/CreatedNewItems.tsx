import React, { useState } from 'react'
import { TableHead, TableStyle, TableWrapper } from '../tableStyle'
import dayjs from 'dayjs'
import { current } from '@reduxjs/toolkit'
import { DeleteProcessButton, NewItemTableRow, NewItemTableTitle, ProcessTD, TableFee, TableFeeData } from '../../../pages/CreateItem/createItemStyle'
import axios from 'axios'
import { Modal } from 'antd'

const CreatedNewItems = ({ createdItemsProcess, processNumber, setCreatedItemsProcess }) => {

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentDeleteId, setCurrentDeleteId] = useState("")

    const showDeleteModal = (id) => {
        setIsDeleteModalOpen(true)
        setCurrentDeleteId(id)
    }

    const handleDeleteOK = () => {
        deleteItem(currentDeleteId)
        setIsDeleteModalOpen(false)
    }

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false)
    }

    const allProcesses = createdItemsProcess.map(item => item.processes)

    const biggestProcessNumber = allProcesses.sort((a, b) => a.length - b.length)
    const totalItemTransferPrice = createdItemsProcess.map(item => item.price).reduce((cur, acc) => +cur + +acc);
    const totalItemTransferCost = createdItemsProcess.map(item => item.processes.map(process => process.price).reduce((cur, acc) => +cur + +acc)).reduce((cur, acc) => +cur + +acc);

    const deleteItem = async (id) => {
        const response = await axios.post("/api/hanghoas/delete", { id: [id] })
        const newCreatedItemsProcess = createdItemsProcess.filter(item => item.id !== id)
        setCreatedItemsProcess(newCreatedItemsProcess)
    }


    return (
        <TableWrapper>

            <Modal title="Xác nhận xóa" open={isDeleteModalOpen} onOk={handleDeleteOK} onCancel={handleCancelDelete}>
                <p>Bạn có muốn xóa không?</p>
            </Modal>

            <NewItemTableTitle>
                Danh sách đơn hàng vừa tạo
            </NewItemTableTitle>

            <TableStyle>
                <thead>
                    <tr>
                        <TableHead>STT</TableHead>
                        <TableHead>Khách hàng</TableHead>
                        <TableHead>Kho</TableHead>
                        <TableHead>Mã hàng Hóa</TableHead>
                        <TableHead>Ngày phát    </TableHead>
                        <TableHead>KG</TableHead>
                        {biggestProcessNumber[biggestProcessNumber.length - 1].map((item, i) => {
                            return (
                                <TableHead key={i}>
                                    <span>Tiến Trình {i + 1}</span>
                                </TableHead>
                            )
                        })
                        }
                        <TableFee>Cước phí</TableFee>
                        <TableFee>Chi phí</TableFee>
                        <TableFee>Còn lại</TableFee>
                        <TableHead>Ghi chú</TableHead>
                        <TableHead>Thao tác</TableHead>
                    </tr>
                </thead>
                <tbody>
                    {createdItemsProcess.map((item, i) => {
                        const sumFee = item.processes.map(fee => fee.price).reduce((cur, acc) => +cur + +acc)
                        const tableDataHolderItem = biggestProcessNumber[biggestProcessNumber.length - 1].slice(0, biggestProcessNumber[biggestProcessNumber.length - 1].length - item.processes.length);

                        return (
                            <NewItemTableRow>
                                <td>{i + 1}</td>
                                <td>{item.customer.name}</td>
                                <td>{item.warehouse.name}</td>
                                <td>{item.name}</td>
                                <td>{dayjs(item.fromDate).format("YYYY-MM-DD")}</td>
                                <td>{item.weight}</td>
                                {item.processes.map(process => {
                                    return (
                                        <td><ProcessTD>
                                            {process.partner.fullName}
                                        </ProcessTD></td>
                                    )
                                })}
                                {item.processes.length < biggestProcessNumber[biggestProcessNumber.length - 1].length &&
                                    tableDataHolderItem.map(item => {
                                        return (
                                            <td></td>
                                        )
                                    })
                                }
                                <TableFeeData>{item.price}</TableFeeData>
                                <TableFeeData>{sumFee}</TableFeeData>
                                <TableFeeData>{item.price - sumFee}</TableFeeData>
                                <td>{item.note}</td>
                                <td>
                                    <DeleteProcessButton onClick={() => {
                                        showDeleteModal(item.id)
                                    }}>
                                        <i className="fa-solid fa-trash-can"></i>
                                    </DeleteProcessButton>
                                </td>
                            </NewItemTableRow>
                        )
                    })}
                    <tr>
                        <td>Tổng</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            Tổng KG: {createdItemsProcess.map(item => item.weight).reduce((cur, acc) => +cur + +acc, 0)}
                        </td>
                        {biggestProcessNumber[biggestProcessNumber.length - 1].length > 1 &&
                            biggestProcessNumber[biggestProcessNumber.length - 1].map(item => {
                                return (
                                    <td></td>
                                )
                            }) || <td></td>
                        }
                        <td>{`${totalItemTransferPrice}`}</td>
                        <td>{`${totalItemTransferCost}`}</td>
                        <td>{`${totalItemTransferPrice - totalItemTransferCost}`}</td>
                    </tr>
                </tbody>
            </TableStyle>
        </TableWrapper>
    )
}

export default CreatedNewItems
