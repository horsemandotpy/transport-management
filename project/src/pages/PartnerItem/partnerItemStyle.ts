import styled from "styled-components";
import { FlexCenter } from "../../style/style";

export const DebtNumber = styled.span<{ positive }>`
  color: ${(props) => (props.positive ? "rgb(31 178 60)" : "red")};
`;

export const InfoButtonWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

export const ModalWrapper = styled.div`
  width: 24rem;
  position: absolute;
  background-color: #ffffff;
  background-clip: padding-box;
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #ccc;
  color: rgba(0, 0, 0, 0.88);
  top: 40px;
  left: -150px;
  z-index: 2;
`;

export const ModalInnerContentBox = styled.div`
  font-size: 14px;
  line-height: 1.5714285714285714;
  list-style: none;
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-weight: normal;
  white-space: normal;
  text-align: start;
  cursor: pointer;
  background-color: #ffffff;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const ModalInnerContentTop = styled.div`
  display: flex;
  flex-direction: column;
  width: 24rem;
  height: auto;
`;

export const ContentTopWrapper = styled.div`
  line-height: 2.25rem;
  padding: 1.25rem;
`;

export const ContentBottomWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
  gap: 0.5rem;
`;

export const ModalInfoColumn = styled.div`
  display: flex;
`;

export const Infor40 = styled.p`
  width: 40%;
`;

export const Infor60 = styled.span`
  display: block;
  width: 60%;
  font-weight: bold;
`;

export const InforLabelWrapper = styled.div`
  width: 20%;
`;

export const OptionInfoWrapper = styled.div`
  width: 80%;
`;

export const PayingMethodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.875rem;
`;

export const CostDisplayBlock = styled.div`
  width: 50%;
  padding-left: 1rem;
`;

export const ModalColumn = styled(FlexCenter)`
  padding: 0.35rem 0;
`;

export const ModalLocationColumn = styled.div`
  display: flex;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  align-items: center;
  input {
    width: 45%;
  }
`;
