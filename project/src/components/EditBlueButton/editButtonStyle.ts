import styled from "styled-components";
import { BlueButtonButton } from "../Button/BlueButton/blueButtonStyle";

export const EditButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: .5rem;
`;

export const EditButton = styled(BlueButtonButton)`
  margin-top: 0;
  margin-bottom: 0;
  border-radius: 6px;
`;
