import { StatusBarWraper, StatusBarWraperChild } from './statusBarStyle'
import { Space, Tag } from 'antd'
import { ClockCircleOutlined, SyncOutlined } from '@ant-design/icons'

const StatusBarProcessNew = ({ status, setStatus }) => {

    const handleChange = (string: string) => {
        if (string === "pending" && status === "inprogress") {
            setStatus("all");
        }
        if (string === "inprogress" && status === "pending") {
            setStatus("all")
        }
        if (string === "pending" && status === "pending") {
            setStatus("all")
        }
        if (string === "inprogress" && status === "inprogress") {
            setStatus("all")
        }
        if (string === "inprogress" && status === "all") {
            setStatus("inprogress")
        }
        if (string === "pending" && status === "all") {
            setStatus("pending")
        }

    };

    return (
        <StatusBarWraper>
            <StatusBarWraperChild>
                <Space size={[0, 8]} wrap>
                    <Tag icon={<ClockCircleOutlined />} color={status === "pending" ? "#ffcc00" : "warning"}
                        onClick={() => { handleChange("pending") }}>
                        Đang chờ
                    </Tag>
                    <Tag icon={<SyncOutlined spin />} color={status === "inprogress" ? "#2db7f5" : "processing"}
                        onClick={() => { handleChange("inprogress") }}>
                        Đang VC
                    </Tag>
                </Space>
            </StatusBarWraperChild>

            <StatusBarWraperChild>
            </StatusBarWraperChild>
        </StatusBarWraper >
    )
}

export default StatusBarProcessNew;
