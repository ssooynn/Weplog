import styled from "styled-components";

const InputStyled = styled.input`
  height: ${(props) => props.height || "auto"};
  width: ${(props) => props.width || "auto"};
  padding: ${(props) => props.padding || "12px 0px"};
  margin: ${(props) => props.margin || "3px 5px"};
  font-family: 'Spoqa Han Sans Neo';
  font-size: 14px;
  font-weight: 400;
  border: 0px;
  &::placeholder{
    color:#C5C5C5;
  }
`;
export function StyledInput({ chidren, height, width, border, padding, margin, ...props }) {
  return <InputStyled type="text" height={height} width={width} border={border} padding={padding} margin={margin} {...props}></InputStyled>;
}