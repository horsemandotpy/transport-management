import styled from "styled-components";

export const ProcessChangeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const ChangeStatusTd = styled.td`
  position: relative;
  color: blue;
  cursor: pointer;
`;

export const ChangeStatusWrapper = styled.ul<{ changeStatus: boolean }>`
  box-sizing: border-box;
  overflow: hidden;
  padding: 4px;
  list-style-type: none;
  background-color: #ffffff;
  background-clip: padding-box;
  border-radius: 8px;
  outline: none;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  position: absolute;
  margin: 0;
  z-index: 2;
  top: -5;
  width: max-content;
  max-height: ${(props) => {
    return props.changeStatus ? "100px" : "0";
  }};
  visibility: ${(props) => (props.changeStatus ? `visible` : `hidden`)};
  transition: all 0.2s ease-in;
`;

export const ChangeStatusOption = styled.li`
  clear: both;
  margin: 0;
  padding: 5px 12px;
  color: rgba(0, 0, 0, 0.88);
  font-weight: normal;
  font-size: 14px;
  line-height: 1.5714285714285714;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 4px;
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;
