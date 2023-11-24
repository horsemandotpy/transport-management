import { PageWrapper, TitleBarWrapper } from '../../style/style'
import { Tabs } from 'antd'
import UserProfile from '../UserProfile/UserProfile'
import UserChangePassword from '../UserChangePassword/UserChangePassword'
import UserCreate from '../UserCreate/UserCreate'
import UserList from '../UserList/UserList'

const UserInfo = () => {

    const items = [
        {
            key: 1,
            children: <UserProfile />,
            label: "Profile",
        },
        {
            key: 2,
            children: <UserChangePassword />,
            label: "Đổi mật khẩu",
        },
        {
            key: 3,
            children: <UserCreate />,
            label: "Thêm user mới",
        },
        {
            key: 4,
            children: <UserList />,
            label: "Danh sách user",
        }

    ]

    return (
        <PageWrapper>
            <TitleBarWrapper>
                <Tabs items={items} />
            </TitleBarWrapper>
        </PageWrapper>
    )
}

export default UserInfo
