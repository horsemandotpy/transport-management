import { ButtonInforStyle } from './inforModalButtonStyle'

const InforModalButton = ({ setOpenModalInfo }) => {
    return (
        <ButtonInforStyle onClick={() => {
            setOpenModalInfo(prev => !prev)
        }}>
            <i className="fa-solid fa-circle-info"></i>
        </ButtonInforStyle>
    )
}

export default InforModalButton
