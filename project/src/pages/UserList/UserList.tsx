import { useEffect, useState } from "react"
import { TableHead, TableStyle, TableWrapper } from "../../components/Tables/tableStyle"
import axios from "axios"
import dayjs from "dayjs"

const UserList = () => {
    const [listUser, setListUser] = useState()

    const getListUser = async () => {
        const data = await axios.get(`/api/user/all`)
        setListUser(data.data.data)
    }

    useEffect(() => {
        getListUser()
    }, [])

    return (
        <TableWrapper>
            <TableStyle>
                <thead>
                    <tr>
                        <TableHead>Tên</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Vai trò</TableHead>
                        <TableHead>Thêm bởi</TableHead>
                        <TableHead>Ngày tạo</TableHead>
                    </tr>
                </thead>
                {listUser &&
                    <tbody>
                        {listUser.map((item: { email: string, name: string, parent: string }, i: string) => {
                            return (
                                <tr key={i}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role === "0" ? "admin" : "manager"}</td>
                                    <td>{item.parent}</td>
                                    <td>{dayjs(item.created).format("DD/MM/YYYY")}</td>
                                </tr>
                            )
                        })}
                    </tbody>}
            </TableStyle>
        </TableWrapper>
    )
}

export default UserList
