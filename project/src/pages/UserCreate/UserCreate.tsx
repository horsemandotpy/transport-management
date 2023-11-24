import { useState } from 'react'
import { FormCreateUser, InfoLabel, RoleSelect, SaveUserButton, ShowPasswordButton, UserInfoRow, UserInput } from './userCreateStyle'

const UserCreate = () => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <FormCreateUser>
            <UserInfoRow>
                <InfoLabel>
                    Tên đăng nhập
                </InfoLabel>
                <UserInput />
            </UserInfoRow>
            <UserInfoRow>
                <InfoLabel>
                    Email
                </InfoLabel>
                <UserInput />
            </UserInfoRow>
            <UserInfoRow>
                <InfoLabel>
                    Mật khẩu
                </InfoLabel>
                <UserInput type={showPassword ? "text" : "password"} />
                <ShowPasswordButton
                    onClick={() => {
                        setShowPassword(prev => !prev)
                    }}
                >
                    {showPassword && <i className="fa-solid fa-eye"></i>}
                    {!showPassword && <i className="fa-solid fa-eye-slash"></i>}
                </ShowPasswordButton>
            </UserInfoRow>
            <UserInfoRow>
                <InfoLabel>
                    Vai trò
                </InfoLabel>
                <RoleSelect>
                    <option value="0">Admin</option>
                    <option value="1">Manager</option>
                </RoleSelect>
            </UserInfoRow>
            <UserInfoRow>
                <div></div>
                <SaveUserButton>
                    OK
                </SaveUserButton>
            </UserInfoRow>
        </FormCreateUser>
    )
}

export default UserCreate
