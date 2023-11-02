import { Dropdown, message } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { storeSetNumberPage } from '../../store/filter-reducer';

const items = [
    {
        label: '10',
        key: '10',
    },
    {
        label: '20',
        key: '20',
    },
    {
        label: '30',
        key: '30',
    },
    {
        label: '40',
        key: '40',
    },
];

const PageSizeController = () => {
    const numberpage = useSelector(state => state.filter.numberpage);
    const dispatch = useDispatch();

    const onClick = (e) => {
        message.info(`Number of Page  ${e.key}`);
        dispatch(storeSetNumberPage(e.key));
    };
    return (
        <>
            <div>
                <span>Kích thước trang:</span>
            </div >
            <Dropdown
                menu={{
                    items,
                    onClick,
                }}
            >
                <a onClick={(e) => {
                    e.preventDefault()
                }}>
                    {numberpage}
                    <DownOutlined />
                </a>
            </Dropdown>
        </>
    )
}

export default PageSizeController
