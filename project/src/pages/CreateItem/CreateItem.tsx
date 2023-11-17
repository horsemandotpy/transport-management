
import CreateItemsTable from '../../components/Tables/CreateItemsTable/CreateItemsTable'
import { PageTitle, PageWrapper, TitleBarWrapper, TitleWrapper } from '../../style/style'

const CreateItem = () => {
    return (
        <PageWrapper>
            <TitleBarWrapper>
                <TitleWrapper>
                    <PageTitle>Tạo mới hàng hóa</PageTitle>
                </TitleWrapper>
            </TitleBarWrapper>
            <CreateItemsTable/>
        </PageWrapper>
    )
}

export default CreateItem
