import { useEffect, useState } from 'react'
import { PageTitle, PageWrapper, TitleBarWrapper } from '../../style/style'
import { InputBox, InputBoxWrapper, InputField } from './settingExchangeStyle'
import { Input } from 'antd'
import BlueButton from '../../components/Button/BlueButton/BlueButton'
import axios from 'axios'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen'

const SettingExchange = () => {

    const [settingOption, setSettingOption] = useState()
    const [updatingData, setUpdatingData] = useState(false)

    const getSettings = async () => {
        const data = await axios.get(`/api/settings`)
        setSettingOption({
            rate_money: data.data.data[0],
            default_input_date: data.data.data[1]
        })
    }

    const updateRateMoney = async () => {
        setUpdatingData(true)
        await axios.post(`/api/settings/1`, settingOption.rate_money)
        setUpdatingData(false)

    }

    const updateDefaultInputDate = async () => {
        await axios.post(`/api/settings/2`, settingOption.default_input_date)
    }

    useEffect(() => {
        getSettings()
    }, [])

    return (
        <PageWrapper>
            {updatingData && <LoadingScreen message={"Updating..."} />}
            <TitleBarWrapper>
                <PageTitle>Settings</PageTitle>
            </TitleBarWrapper>
            <InputBoxWrapper>
                {settingOption && <InputBox>
                    <InputField>
                        <div>Tỉ giá NDT-VNĐ:</div>
                        <Input
                            value={settingOption.rate_money.value}
                            onChange={(e) => {
                                const newRateMoney = {
                                    ...settingOption.rate_money,
                                    value: e.target.value
                                }
                                setSettingOption({
                                    ...settingOption,
                                    rate_money: newRateMoney
                                })
                            }}
                        />
                    </InputField>
                    <InputField>
                        <div>Ngày phát hàng mặc định:</div>
                        <Input
                            defaultValue={settingOption.default_input_date.value}
                            onChange={(e) => {
                                const newDefaultInputDate = {
                                    ...settingOption.default_input_date,
                                    value: e.target.value
                                }
                                setSettingOption({
                                    ...settingOption,
                                    default_input_date: newDefaultInputDate
                                })
                            }}
                        />
                    </InputField>
                    <InputField>
                        <div></div>
                        <div onClick={(e) => {
                            e.preventDefault()
                            updateRateMoney()
                            updateDefaultInputDate()
                            getSettings()
                        }}>
                            <BlueButton name={"Lưu chỉnh sửa"} setOpenModal={() => { }} />
                        </div>
                    </InputField>
                </InputBox>}
            </InputBoxWrapper>
        </PageWrapper>
    )
}

export default SettingExchange
