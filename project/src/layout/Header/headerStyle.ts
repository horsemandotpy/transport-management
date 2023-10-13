import styled from "styled-components";

export const HeaderWraper = styled.header`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  background: rgb(248 248 248);
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  margin-bottom: 1.6rem;
`;

export const HeaderLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
  padding: 1.5rem;
  height: 20px;
`;

export const OptionWrapper = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 80%;

  li {
    list-style: none;
    cursor: pointer;
    flex-wrap: nowrap;
    padding: 1rem;
  }

   .active {
    background-color: #e7e7e7;
  }

  li:active {
    background-color: red;
  }

  li a {
    text-decoration: none;
    color: rgb(85 85 85);
  }
  li a:hover {
    color: rgb(51 51 51);
  }
`;

export const PofileWrapper = styled.div`
  width: 5%;
  display: flex;
  align-items: center;
`;
