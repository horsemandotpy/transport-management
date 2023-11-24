import styled from "styled-components";

export const InputBoxWrapper = styled.div`
  padding-top: 3rem;
  border-top: 2px solid #e5e7eb;
  max-width: 1200px;
  width: 100%;
  margin: 2rem auto;
  display: flex;
`;

export const InputBox = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputField = styled.div`
  display: grid;
  grid-template-columns: 250px 380px 500px;
`;
