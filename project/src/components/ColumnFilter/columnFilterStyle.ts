import styled from "styled-components";

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 20px;
  left: -102px;
  z-index: 2;
  background: #fff;
  width: 200px;
  border: 1px solid;
  border-radius: 2px;
  border-color: #e5e7eb;
`;

export const MenuFilter = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 200px;
  overflow: scroll;

  label {
    width: 100%;
  }
`;

export const MenuButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  border-top: 2px solid #e5e5e5;
  margin-top: 1rem;
  padding: .5rem 0.5rem;
  z-index: 2;

  button {
    background-color: #fff;
    border: 1px solid #e5e5e5;
    padding: .5rem;
    cursor: pointer;
    border-radius: 8px;
  }

  button.save {
    color: #fff;
    background-color: rgb(51 122 183)
  }
`;
