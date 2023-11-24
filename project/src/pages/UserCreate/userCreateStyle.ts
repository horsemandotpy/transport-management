import styled from "styled-components";

export const FormCreateUser = styled.div`
  padding-top: 4rem;
  padding-left: 5rem;
`;

export const UserInfoRow = styled.div`
  display: grid;
  grid-template-columns: 200px 380px 500px;
  margin-bottom: 1.5rem;
`;

export const InfoLabel = styled.p`
  display: flex;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
  justify-content: flex-end;
  align-items: center;
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

export const ShowPasswordButton = styled.button`
  position: relative;
  right: 42px;
  width: 42px;
  border-radius: 5px;
  padding-left: 12px;
  cursor: pointer;
  background-color: #fff;
  outline: none;
  border: 1px solid rgb(209 213 219);
`;

export const RoleSelect = styled.select`
  outline-color: #1677ff;
  padding: 0.625rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  border-radius: 0.375rem;
  margin-left: 2.5rem;
  border: 1px solid rgb(209 213 219);
`;

export const SaveUserButton = styled.button`
  background-color: rgb(51 122 183);
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.625rem 1.25rem;
  border-radius: 0.125rem;
  color: #fff;
  border: none;
  cursor: pointer;
  max-width: 57px;
  margin-left: 3rem;

  &:hover {
    background-color: rgb(96 165 250);
  }
`;
