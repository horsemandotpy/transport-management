import { StatusBarWraper, StatusBarWraperChild } from './statusBarStyle'
import { Space, Tag } from 'antd'
import { CheckCircleOutlined, CheckOutlined, CheckSquareOutlined, ClockCircleOutlined, MinusCircleOutlined, SyncOutlined } from '@ant-design/icons'
import ColumnFilter from '../ColumnFilter/ColumnFilter'

const StatusBar = ({ status, setStatus, colTitle, setColTitle, allCol, setAllCol }) => {

    const handleChange = (number: number) => {
        const currentSelected = status.slice();
        if (currentSelected.includes(number)) {
            const newSelected = currentSelected.filter(tag => tag !== number)
            console.log(newSelected)
            setStatus(newSelected);
        } else {
            currentSelected.push(number)
            console.log(status)
            setStatus(currentSelected)
        }

    };

    return (
        <StatusBarWraper>
            <StatusBarWraperChild>
                <Space size={[0, 8]} wrap>
                    <Tag icon={<ClockCircleOutlined />} color={status.includes(0) ? "#ffcc00" : "warning"}
                        onClick={() => { handleChange(0) }}>
                        Đang chờ
                    </Tag>
                    <Tag icon={<SyncOutlined spin />} color={status.includes(1) ? "#2db7f5" : "processing"}
                        onClick={() => { handleChange(1) }}>
                        Đang VC
                    </Tag>
                    <Tag icon={<CheckOutlined />} color={status.includes(4) ? "#1612da" : "geekblue"}
                        onClick={() => { handleChange(4) }}>
                        Hoàn thành VC
                    </Tag>
                    <Tag icon={<CheckCircleOutlined />} color={status.includes(2) ? "  #87d068" : "success"}
                        onClick={() => { handleChange(2) }}>
                        Hoàn thành
                    </Tag>
                    <Tag icon={<CheckSquareOutlined />} color={status.includes(3) ? "#800080" : "purple"}
                        onClick={() => { handleChange(3) }}>
                        Đã giao KH
                    </Tag>
                    <Tag icon={<MinusCircleOutlined />} color={status.includes(-3) ? "#f50" : "error"}
                        onClick={() => { handleChange(-3) }}>
                        Hủy
                    </Tag>
                </Space>
            </StatusBarWraperChild>

            <StatusBarWraperChild>
                <ColumnFilter allCol={allCol} setColTitle={setColTitle} setAllCol={setAllCol} />
            </StatusBarWraperChild>
        </StatusBarWraper >
    )
}

export default StatusBar;
