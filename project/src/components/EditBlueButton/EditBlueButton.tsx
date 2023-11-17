import { EditButton, EditButtonWrapper } from "./editButtonStyle"

const EditBlueButton = ({ name, setOpenEditInfo }) => {
    return (
        <EditButtonWrapper>
            <EditButton onClick={() => {
                setOpenEditInfo(true)
            }}>{name}</EditButton>
        </EditButtonWrapper>
    )
}

export default EditBlueButton
