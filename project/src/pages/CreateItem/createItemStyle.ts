import { Button } from "antd";
import styled from "styled-components";

export const PartnerForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const TableFee = styled.th`
  min-width: 80px;
`;

export const TableFeeData = styled.td`
  min-width: 80px;
`;

export const InputBlock = styled.div`
  display: grid;
  grid-template-columns: 130px 1fr;
  margin-top: 1.25rem;
`;

export const InputFormLabel = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 1rem;
  text-align: left;
`;

export const ProcessTitle = styled.p`
  font-weight: 600;
`;

export const ButtonWrapper = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
`;

export const ButtonFee = styled.button`
  outline: 2px solid transparent;
  outline-offset: 2px;
  padding: 0.375rem 0.625rem;
  border: 1px;
  border-radius: 1.5rem;
  width: 70%;
  line-height: 22px;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
`;

export const NewItemTableTitle = styled.h2`
  font-size: 2rem;
  margin-left: 2rem;
  margin-bottom: 2rem;
`;

export const NewItemTableRow = styled.tr`
  background-color: ${`rgb(243 251 255)`};
  border-top: 0.5px solid #ebebeb;
  border-bottom: 0.5px solid #ebebeb;
`;

export const ProcessTD = styled.div`
  width: 190px;
  overflow: scroll;
  border: 1px solid #ebebeb;
  white-space: nowrap;
  padding: 0.5rem;
  background-color: #fff;
  scrollbar-width: none; //firefox

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DeleteProcessButton = styled.span`
  border: 1px solid #d9d9d9;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    color: #4096ff;
    border-color: #4096ff;
  }
`;
