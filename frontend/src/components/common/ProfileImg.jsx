import styled from "styled-components";

const ProfileStyled = styled.img`
  height: ${(props) => props.height || "110px"};
  width: ${(props) => props.width || "110px"};
  border-radius: 50%;
  margin: ${(props) => props.margin || "5px"};
  /* box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2); */
  object-fit: cover;
`;

export function StyledProfile({ chidren, height, width, border, padding, margin, ...props }) {
  return <ProfileStyled height={height} width={width} margin={margin} {...props}></ProfileStyled>;
}