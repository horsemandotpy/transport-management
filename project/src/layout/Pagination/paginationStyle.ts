import styled from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PaginationItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  color: rgb(51 122 183);
  padding: .7rem;
  border: 0.5px solid rgb(209 213 219);
  cursor: pointer;
  font-size: .85rem;

  &:first-of-type {
    border-bottom-left-radius: 6px;
    border-top-left-radius: 6px;
  }

  &:last-of-type {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  &:hover {
    background-color: rgb(238 238 238);
  }

  &.active-page {
    color: #fff;
    background-color: rgb(51 122 183);
    border-color: rgb(51 122 183);
    font-weight: bold;
  }
`;
