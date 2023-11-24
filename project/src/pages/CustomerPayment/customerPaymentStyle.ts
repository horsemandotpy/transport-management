import styled from "styled-components";

export const PaymentModalColumn = styled.div`
  display: grid;
  grid-template-columns: 130px 1fr;
  padding-top: 1.25rem;
  font-size: 14px;

  div {
    display: flex;
    align-items: center;
  }

  h6 {
    font-weight: bold;
  }
`;
