import { SketchPicker } from "react-color";
import styled from "styled-components";

export const ColorSettingsWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

export const SubPageTitle = styled.h3`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2rem;
  margin-bottom: 1rem;
`;

export const ColorSettingRow = styled.div`
  display: grid;
  grid-template-columns: 350px 300px 50px;
  margin-bottom: 1.75rem;
`;

export const ColorSettingLabel = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.25rem;
  display: flex;
  align-items: center;
`;

export const InputColorSetting = styled.input<{ background_color: string }>`
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-left: 0.75rem;
  border-radius: 0.125rem;
  border: 1px solid rgb(107 114 128);
  height: 3rem;
  background-color: ${(props) => props.background_color};
  color: rgb(107 114 128);
  width: 250px;
  margin-left: 2rem;
`;

export const SketchColor = styled(SketchPicker)`
  padding: 0 !important;
  box-shadow: none !important;
`;

export const ButtonReset = styled.button`
  background-color: transparent;
  border: none;
  font-size: large;
  cursor: pointer;
`;

export const SaveColorButton = styled.button`
  color: rgb(255 255 255);
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-top: 0.5rem;
  padding: 0.5rem 3rem;
  border-radius: 0.25rem;
  margin-left: 24rem;
  border: 0 solid #e5e7eb;
  cursor: pointer;
  background-color: rgb(51, 122, 183);

  &:hover {
    background-color: rgb(147 197 253);
  }
`;
