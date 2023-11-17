import styled from "styled-components";

export const CalendarWrapper = styled.p`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

export const CalendarTagsWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.88);
  font-size: 12px;
  line-height: 20px;
  list-style: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  height: auto;
  margin-inline-end: 8px;
  padding-inline: 7px;
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  opacity: 1;
  transition: all 0.2s;
  text-align: start;
  position: relative;
`;
