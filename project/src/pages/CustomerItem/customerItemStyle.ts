import { Link } from "react-router-dom";
import styled from "styled-components";

export const LinkParentCustomer = styled(Link)`
  font-size: 18px;
`;

export const PaymentNumberColor = styled.span<{ color: string }>`
  color: ${(props) => props.color};
`;
