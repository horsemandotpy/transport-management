import styled from "styled-components";

export const TableWrapper = styled.div`
  margin-top: 2rem;
  margin-left: 10rem;
  margin-bottom: 1rem;
  width: 100%;
  font-size: 14px;
  line-height: 20px;
`;

export const TableStyle = styled.table`
  text-align: left;
  table-layout: fixed;
  td {
    padding: 0.2rem 1rem;
    box-sizing: border-box;
  }
  th {
    padding: 0 1rem;
    font-weight: bolder;
  }
  tr {
    border-bottom-width: 1px;
    box-sizing: border-box;

    border-style: solid;
    border-color: #e5e7eb;
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
  padding-left: 1rem;
  padding-right: 1rem;
  height: 100%;
  min-width: 240px;

  &:first-of-type {
    min-width: 2rem;
    max-width: 6rem;
  }
`;

export const TableData = styled.td`
  min-width: 250px;
  max-width: 250px;
`;

export const ProcessWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const MaxContentContainer = styled.div`
  width: max-content;
  display: flex;
  align-items: center;
`;

export const ProcessTH = styled.th`
  min-width: 100px;
  text-align: left;
`;

export const ThCenter = styled.th`
  min-width: 100px;
`;

export const Tabody = styled.tbody`
  text-indent: 0;
  border-collapse: collapse;
  box-sizing: border-box;
  border-width: 0;
  border-bottom-width: 0px;
  border-style: solid;
  border-color: #e5e7eb;
`;
