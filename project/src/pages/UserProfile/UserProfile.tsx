import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { UserInfoRow, UserProfileWrapper } from './userProfileStyle'

const UserProfile = () => {
    const [user, setUser] = useState()

    const getUserInfo = async () => {
        const data = await axios.get("/api/user")
        setUser(data.data)
    }

    useEffect(() => {
        getUserInfo()
    }, [])
    return (
        <div>
            {user &&
                <UserProfileWrapper>
                    <UserInfoRow>
                        <p style={{ textAlign: "right" }}>Tên đăng nhập:</p>
                        <p style={{ paddingLeft: "2.5rem" }}>{user.name}</p>
                    </UserInfoRow>

                    <UserInfoRow>
                        <p style={{ textAlign: "right" }}>Email:</p>
                        <p style={{ paddingLeft: "2.5rem" }}>{user.email}</p>
                    </UserInfoRow>

                    <UserInfoRow>
                        <p style={{ textAlign: "right" }}>Vai trò:</p>
                        <p style={{ paddingLeft: "2.5rem" }}>{user.role === "0" ? "Admin" : "Manager"}</p>
                    </UserInfoRow>
                </UserProfileWrapper>
            }
        </div>
    )
}

export default UserProfile
