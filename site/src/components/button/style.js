import styled from "styled-components"

export const ButtonWrapper = styled.button`
  cursor: pointer;
  color: ${p => (p.textColor ? p.textColor : p.theme.colors.accent)};
  background: ${p =>
    p.backgroundColor || p.theme.colors[p.backgroundColor] || "white"};

  border: ${p => p.border || "none"};
  border-radius: 3px;
  padding: 0.25em;
  font-weight: bold;
  transition: box-shadow 0.3s ease;
  ${p => (p.fontSize ? `font-size: ${p.fontSize};` : "")}

  :hover {
    outline: none;
    box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2);
  }
`
