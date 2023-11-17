import styled from "styled-components";
import { Select } from "antd";

export const PageTitle = styled.h1`
  font-size: 1.5rem;
`;
export const TitleBarWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  justify-content: space-between;
  display: flex;

  & > * {
    padding: 0 1rem;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SelectOption = styled(Select)`
  flex: 1 1 auto;
  flex-basis: 25%;
  overflow: hidden;
  .ant-select-arrow {
    right: 20px;
  }
`;

export const AddButton = styled.span`
  display: block;
  color: rgb(51, 122, 183);
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 900;
`;

export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
