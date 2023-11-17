import EditBlueButton from "../EditBlueButton/EditBlueButton"
import { BoardWrapper, InfoDataWrapper, InforRow, InforWrapper, LastInfoRow } from "./informationBoardStyle"

const InformationBoard = ({ inforDisplay, arrayInfor, setOpenEditInfo, setInforDisplay }) => {

    return (
        <BoardWrapper inforDisplay={inforDisplay}>
            <InforWrapper onClick={() => {
                setInforDisplay(false)
            }}>
                {arrayInfor.map(item => {
                    return (
                        <InforRow>
                            <InfoDataWrapper>
                                {item.label}
                            </InfoDataWrapper>
                            <InfoDataWrapper><span>{item.value}</span></InfoDataWrapper>
                        </InforRow>
                    )
                })}
                <LastInfoRow />
                <EditBlueButton name={'Sửa'} setOpenEditInfo={setOpenEditInfo} />
            </InforWrapper>
        </BoardWrapper>

    )
}

export default InformationBoard
