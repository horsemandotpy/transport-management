import styled from "styled-components";

export const BoardWrapper = styled.div<{ inforDisplay: boolean }>`
  width: 450px;
  padding: 4px;
  border-width: 0;
  box-sizing: border-box;
  border-style: solid;
  border-color: #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  position: absolute;
  z-index: 3;
  top: 110px;
  left: 300px;
  visibility: ${(props) => (props.inforDisplay ? `visible` : `hidden`)};
  max-height: ${(props) => (props.inforDisplay ? `600px` : `0`)};
  overflow: hidden;
  transition: all 0.3s ease-in;
`;

export const InforWrapper = styled.div`
  padding: 5px 12px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const InforRow = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 0.375rem;
`;

export const LastInfoRow = styled.div`
  border-bottom: 2px solid;
  border-color: #e5e7eb;
  padding-bottom: 0.375rem;
`;

export const InfoDataWrapper = styled.div`
  display: flex;
  width: 50%;
`;
