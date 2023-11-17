import { BlueButtonButton, BlueButtonWrapper } from './blueButtonStyle'

const BlueButton = ({ name, setOpenModal }) => {
    return (
        <BlueButtonWrapper>
            <BlueButtonButton onClick={() => {
                setOpenModal(true)
            }}>{name}</BlueButtonButton>
        </BlueButtonWrapper>
    )
}

export default BlueButton
