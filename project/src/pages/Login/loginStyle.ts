import styled from "styled-components";

export const LoginFormWrapper = styled.form`
  max-width: 32rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-weight: 500;
    margin-bottom: 6px;
  }

  span {
    margin-top: 6px;
  }
`;

export const ErrorText = styled.span`
  color: red;
`;

export const InputBar = styled.input`
  padding: 0.7rem;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
`;

export const ButtonLogin = styled.button`
  padding: 1rem;
  background: rgb(51 122 183);
  color: #fff;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
`;

export const TitleLoginWrapper = styled.div`
  text-align: center;
`
