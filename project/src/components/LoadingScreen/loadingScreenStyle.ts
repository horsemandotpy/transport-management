import { Button } from "antd";
import styled from "styled-components";

export const LoadingScreenWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  min-width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0 auto;
  z-index: 2;
`;

export const LoadingButtonWrapper = styled.div`
  @keyframes loadingDown {
    100% {
      transform: translateY(30px);
    }
  }

  max-width: 200px;
  margin: 0 auto;
  transition: all 3s ease-in;
  animation: loadingDown 1s;
  animation-fill-mode: both;
  animation-delay: 0.5s;
`;

export const LoadingButton = styled(Button)`
  background-color: #fff;
  color: green;
  opacity: 1 !important;
  position: relative;
  z-index: 5 !important;
`;
