import { PageTitle, PageWrapper, TitleBarWrapper } from '../../style/style'
import { ButtonReset, ColorSettingLabel, ColorSettingRow, ColorSettingsWrapper, InputColorSetting, SaveColorButton, SketchColor, SubPageTitle } from './userSettingsStyle'
import { useEffect, useState } from 'react';
import { Popover } from 'antd';
import axios from 'axios';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

const UserSettings = () => {
    const [statusColor, setStatusColor] = useState()
    const [baseColor, setBaseColor] = useState()
    const [loadingColor, setLoadingColor] = useState(false)

    const getColors = async () => {
        const data = await axios.get(`/api/setting/user/status/color`)
        setBaseColor(JSON.parse(JSON.stringify(data.data)))
        setStatusColor(data.data)
    }

    const savePostColor = async (statusColor) => {
        setLoadingColor(true)
        await axios.post("/api/setting/user/status/color", statusColor)
        setLoadingColor(false)
    }

    useEffect(() => {
        getColors()
    }, [])


    return (
        <PageWrapper>
            {loadingColor && <LoadingScreen message={"Đang lưu thay đổi"} />}
            <TitleBarWrapper
                style={{
                    borderBottom: "2px solid #e5e7eb",
                    paddingBottom: "1.25rem",
                    marginBottom: "2.5rem"
                }}
            >
                <PageTitle
                    style={{
                        fontSize: "2.5rem",
                    }}
                >User Settings
                </PageTitle>
            </TitleBarWrapper>

            {statusColor && <ColorSettingsWrapper>
                <SubPageTitle>Màu trạng thái hàng hoá</SubPageTitle>
                {Object.entries(statusColor.item).reverse().map((color, i) => {
                    const content = <SketchColor
                        color={color[1]}
                        onChange={(e) => {
                            const newStatusColor = { ...statusColor }
                            newStatusColor.item[`${color[0]}`] = e.hex;
                            setStatusColor(newStatusColor)
                        }}
                    />;

                    return (
                        <ColorSettingRow>
                            <ColorSettingLabel>
                                {color[0] === "completeDeliver" && "Hoàn thành vận chuyển:"}
                                {color[0] === "cancelled" && "Đã huỷ:"}
                                {color[0] === "completed" && "Hoàn thành:"}
                                {color[0] === "delivering" && "Đang vận chuyển:"}
                                {color[0] === "delivered" && "Đã giao khách hàng:"}
                                {color[0] === "waiting" && "Đang chờ:"}
                            </ColorSettingLabel>
                            <Popover
                                placement="rightTop"
                                content={content}
                                trigger={"click"}
                            >
                                <InputColorSetting
                                    background_color={`${color[1]}`}
                                    value={`${color[1]}`}

                                    onChange={(e) => {
                                        const newStatusColor = { ...statusColor }
                                        newStatusColor.item[`${color[0]}`] = e.target.value;
                                        setStatusColor(newStatusColor)
                                    }}
                                />
                            </Popover>
                            <ButtonReset
                                onClick={() => {
                                    const defaultColorRow = { ...statusColor }
                                    defaultColorRow.item[`${color[0]}`] = baseColor.item[`${color[0]}`]
                                    setStatusColor(defaultColorRow)
                                }}
                            >
                                <i
                                    className="fa-solid fa-rotate-left"
                                >
                                </i>
                            </ButtonReset>
                        </ColorSettingRow>
                    )
                })}

                <SubPageTitle>Màu trạng thái tiến trình</SubPageTitle>
                {Object.entries(statusColor.transfer).reverse().map((color, i) => {
                    const content = <SketchColor
                        color={color[1]}
                        onChange={(e) => {
                            const newStatusColor = { ...statusColor }
                            newStatusColor.transfer[`${color[0]}`] = e.hex;
                            setStatusColor(newStatusColor)
                        }}
                    />;


                    return (
                        <ColorSettingRow>
                            <ColorSettingLabel>
                                {color[0] === "completeDeliver" && "Hoàn thành vận chuyển:"}
                                {color[0] === "cancelled" && "Đã huỷ:"}
                                {color[0] === "completed" && "Hoàn thành:"}
                                {color[0] === "delivering" && "Đang vận chuyển:"}
                                {color[0] === "waiting" && "Đang chờ:"}
                            </ColorSettingLabel>
                            <Popover
                                placement="rightTop"
                                content={content}
                                trigger={"click"}
                            >
                                <InputColorSetting
                                    background_color={`${color[1]}`}
                                    value={`${color[1]}`}

                                    onChange={(e) => {
                                        const newStatusColor = { ...statusColor }
                                        newStatusColor.transfer[`${color[0]}`] = e.target.value;
                                        setStatusColor(newStatusColor)
                                    }}
                                />
                            </Popover>
                            <ButtonReset
                                onClick={() => {
                                    const defaultColorRow = { ...statusColor }
                                    defaultColorRow.transfer[`${color[0]}`] = baseColor.transfer[`${color[0]}`]
                                    setStatusColor(defaultColorRow)
                                }}
                            >
                                <i
                                    className="fa-solid fa-rotate-left"
                                >
                                </i>
                            </ButtonReset>
                        </ColorSettingRow>
                    )
                })}
                <SaveColorButton
                    onClick={() => {
                        savePostColor(statusColor)
                        getColors()
                    }}
                >
                    Lưu chỉnh sửa
                </SaveColorButton>
            </ColorSettingsWrapper>}



        </PageWrapper>
    )
}

export default UserSettings
