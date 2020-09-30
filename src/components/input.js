import styled from "@emotion/styled";

export const SearchInput = styled("input")`
  font-size: 1em;
  height: 3em;
  border: 2px solid rgb(204, 204, 204);
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
  padding-left: 1em;
  transition: 0.25s border-color ease-out;
  &:hover {
    border-color: rgb(179, 179, 179);
  }
  &:focus {
    border-color: rgb(38, 132, 255);
  }
`;
