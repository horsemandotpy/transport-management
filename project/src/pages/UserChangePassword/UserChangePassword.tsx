import { useEffect, useState } from 'react'
import { ChangePasswordButton, ErrorText, UserChangePasswordWrapper, UserInfoRow, UserInput, WarningText } from './userChangePasswordStyle'
import axios from 'axios'

const UserChangePassword = () => {
    const [user, setUser] = useState()
    const [errorCode, setErrorCode] = useState();
    const [emptyPasswordError, setEmptyPasswordError] = useState([])



    const getUserInfo = async () => {
        const data = await axios.get("/api/user")
        setUser(data.data)
    }

    const postChangePassword = async () => {
        const data = await axios.post(`/api/user/passChange`, user)
        console.log(data.data)
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <>
            <UserChangePasswordWrapper>
                <UserInfoRow>
                    <p
                        style={{
                            textAlign: "right"
                        }}
                    >Mật khẩu cũ</p>
                    <UserInput
                        onChange={(e) => {
                            setEmptyPasswordError(emptyPasswordError.filter(code => code !== 0))
                            setUser({
                                ...user,
                                password: e.target.value,
                            })
                        }}
                        onBlur={(e) => {
                            if (e.target.value === "") {
                                const newCode = [...emptyPasswordError]
                                newCode.push(0)
                                setEmptyPasswordError(newCode)
                            }
                        }}
                    />
                    {emptyPasswordError.includes(0) && <WarningText> Mật khẩu không được để trống</WarningText>}
                </UserInfoRow>
                <UserInfoRow>
                    <p
                        style={{
                            textAlign: "right"
                        }}
                    >Mật khẩu mới</p>
                    <UserInput
                        onChange={(e) => {
                            setEmptyPasswordError(emptyPasswordError.filter(code => code !== 1))
                            setUser({
                                ...user,
                                newpass1: e.target.value,
                            })
                        }}
                        onBlur={(e) => {
                            if (e.target.value === "") {
                                const newCode = [...emptyPasswordError]
                                newCode.push(1)
                                setEmptyPasswordError(newCode)
                            }
                        }}
                    />
                    {emptyPasswordError.includes(1) && <WarningText> Mật khẩu không được để trống</WarningText>}
                </UserInfoRow>
                <UserInfoRow>
                    <p
                        style={{
                            textAlign: "right"
                        }}
                    >Nhập lại mật khẩu mới</p>
                    <UserInput
                        onChange={(e) => {
                            setEmptyPasswordError(emptyPasswordError.filter(code => code !== 2))
                            setUser({
                                ...user,
                                newpass2: e.target.value,
                            })
                        }}
                        onBlur={(e) => {
                            if (e.target.value === "") {
                                const newCode = [...emptyPasswordError]
                                newCode.push(2)
                                setEmptyPasswordError(newCode)
                            }
                        }}
                    />
                    {emptyPasswordError.includes(2) && <WarningText> Mật khẩu không được để trống</WarningText>}
                    {user && !emptyPasswordError.includes(2) && user.newpass1 !== user.newpass2 && <ErrorText>Mật khẩu không trùng khớp</ErrorText>}

                </UserInfoRow>
                <div
                    style={{
                        paddingLeft: "242px"
                    }}
                >
                    <ChangePasswordButton
                        onClick={() => {
                            if (user.newpass1 === user.newpass2 && emptyPasswordError.length < 1) {
                                postChangePassword()
                            }
                        }}
                    >OK</ChangePasswordButton>
                </div>
            </UserChangePasswordWrapper >
        </>
    )
}

export default UserChangePassword
