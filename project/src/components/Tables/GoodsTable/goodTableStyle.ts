import styled from "styled-components";

export const FirstTH = styled.th`
  padding-left: 0.5rem;
`;

export const TableRowItem = styled.tr`
  background-color: rgb(217, 237, 247);
  .fa-trash-can,
  .fa-ban {
    visibility: hidden;
  }

  &:hover {
    .fa-ban,
    .fa-trash-can {
      visibility: visible;
      cursor: pointer;

      &:hover {
        color: rgb(30 64 175);
      }
    }
  }
`;

export const IndexButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 3px;
`;

export const DropdownWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

export const DropdownCheckboxAction = styled.div`
  display: block;
  position: absolute;
  width: 120px;
  z-index: 2;

  padding: 4px;
  list-style-type: none;
  background-color: #ffffff;
  background-clip: padding-box;
  border-radius: 8px;
  outline: none;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);

  div {
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

    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
`;

export const IndexBox = styled.div`
  display: flex;
  gap: 0.2rem;
  padding-left: 0.5rem;
  align-items: center;
`;
