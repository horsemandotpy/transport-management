import styled from "styled-components";

export const StatusBarWraper = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 2rem;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
`;

export const StatusBarWraperChild = styled.div`
  display: flex;
  position: relative;

  & > div {
    cursor: pointer;
  }
`;
