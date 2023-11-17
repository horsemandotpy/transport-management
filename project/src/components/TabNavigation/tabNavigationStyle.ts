import styled from "styled-components";

export const TabNavWrapper = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid rgb(229 231 235);
  width: 1200px;
  margin: 0 auto;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-bottom: 1.5rem;
`;

export const TabNavBar = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 600px;
  list-style: none;
`;

export const TabNavLi = styled.li`
  margin-right: 0.5rem;
`;

export const TabNavLink = styled.span<{ tabActive: boolean }>`
  color: ${(props) =>
    props.tabActive ? "rgb(51 122 183)" : "rgb(107 114 128)"};
  padding: 0.75rem;
  text-decoration: none;

  border-bottom: ${(props) => (props.tabActive ? "2px" : "0")} solid
    rgb(51 122 183);
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  display: inline-block;
  text-decoration: none;

  &:hover {
    background-color: ${(props) =>
      props.tabActive ? "transparent" : "rgb(243 244 246)"};
    border-bottom: ${(props) =>
      props.tabActive
        ? "2px solid  rgb(51 122 183)"
        : "2px solid rgb(243 244 246)"};
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
  }
`;
