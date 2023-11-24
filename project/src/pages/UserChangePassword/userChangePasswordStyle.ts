import styled from "styled-components";

export const UserChangePasswordWrapper = styled.div`
  line-height: 2.5rem;
  font-weight: 700;
  font-size: 0.875rem;
  margin-top: 4rem;
  margin-left: 6rem;
`;

export const UserInfoRow = styled.div`
  display: grid;
  grid-template-columns: 200px 380px 300px;
  margin-bottom: 1.5rem;
`;

export const UserInput = styled.input`
  outline-color: #1677ff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.625rem;
  border: 1px solid rgb(209 213 219);
  border-radius: 0.375rem;
  margin-left: 2.5rem;
`;

export const WarningText = styled.div`
  color: rgb(138 109 59);
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-top: 0.75rem;
  margin-left: 1.25rem;
`;

export const ErrorText = styled.div`
  color: #ff555f;
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-top: 0.75rem;
  margin-left: 1.25rem;
`;

export const ChangePasswordButton = styled.button`
  background-color: rgb(51 122 183);
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.625rem 1.25rem;
  border-radius: 0.125rem;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgb(96 165 250);
  }
`;
