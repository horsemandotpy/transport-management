import styled from "styled-components";
import { FlexCenter } from "../../style/style";

export const ProcessStatusBarWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  gap: 1rem;
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

export const PayingMethodButton = styled.button<{ green }>`
  --tw-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: inset 0 2px 4px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  outline: 2px solid transparent;
  outline-offset: 2px;
  padding: 0.375rem 0.625rem;
  border-width: 0;
  border-radius: 1.5rem;
  width: 70%;
  cursor: pointer;

  font-size: 1rem;
  line-height: 22px;
  font-weight: 300;

  background-color: ${(props) => (props.green ? "rgb(222 239 215)" : "")};
`;

export const CostDisplayBlock = styled.div`
  width: 50%;
  padding-left: 1rem;
`;

export const ModalColumn = styled(FlexCenter)`
  padding: 0.35rem 0;
`;
