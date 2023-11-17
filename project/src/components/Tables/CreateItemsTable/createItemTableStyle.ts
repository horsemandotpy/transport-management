import { Select } from "antd";
import styled from "styled-components";

export const SelectOption = styled(Select)`
  width: 100%;
`;
export const InputGoodsField = styled.div`
  border: 1px solid #ebebeb;
  border-radius: 6px;
  width: 100%;
`;
export const TagDisplay = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  margin: 0;
  gap: 3px;
`;

export const TagChildDisplay = styled.li`
  background-color: gray;
  padding: 0.25rem;
  border-radius: 0.25rem;
  list-style: none;

  span {
    padding: 0.25rem;
  }

  span:last-of-type {
    cursor: pointer;
  }
`;

export const ProcessButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
`;

export const ProcessButtonMove = styled.div`
  display: flex;
  gap: 15px;

  & > i {
    cursor: pointer;
    font-size: 1.15rem;
  }
`;

export const ProcessButtonSave = styled.div`
  display: flex;
  gap: 15px;

  button {
    padding: 0;
    border: 0;
    background: none;

    i {
      font-size: 1.75rem;
    }
  }
`;

export const ProcessSaveButton = styled.button<{ disabled?: boolean }>`
  .fa-floppy-disk {
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  }
`;
