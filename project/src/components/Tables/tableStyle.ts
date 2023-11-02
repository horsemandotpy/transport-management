import styled from "styled-components";

export const TableWrapper = styled.div`
  margin-top: 2rem;
`;

export const TableStyle = styled.table`
  text-align: left;
  table-layout: fixed;
  td {
    padding: 1rem;
  }
`;
export const ClickArrow = styled.div`
  background: rgb(203 213 225);
  padding: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;

export const MenuTransferWrapper = styled.th`
  position: relative;
  width: 120px;
  padding-left: 10px;
  padding-right: 10px;
  height: 100%;

  &:first-of-type {
    min-width: 2rem;
    max-width: 6rem;
  }

  & > div {
    width: 100%;
    display: none;
    height: calc(100% + 1px);
    position: absolute;
    top: 0;
    left: 0;
  }

  &:hover > div {
    display: flex;
  }
`;

export const TableHead = styled.th`
  width: 120px;
  padding-left: 10px;
  padding-right: 10px;
  height: 100%;

  &:first-of-type {
    min-width: 2rem;
    max-width: 6rem;
  }
`;
