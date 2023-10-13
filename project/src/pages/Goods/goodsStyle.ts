import { Select } from "antd";
import styled from "styled-components";

export const GoodWrapper = styled.div``;

export const TitleBarWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;

  & > * {
    padding: 0 1rem;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: .5rem;
`;

export const SelectClient = styled(Select)`
    flex: 1 1 auto;
    flex-basis: 25%;
    overflow: hidden;
    .ant-select-arrow{
        right:20px;
    }
`
