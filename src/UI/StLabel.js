import React from "react";
import styled from "styled-components";

const StLabel = ({ mode, children, onClick, name }) => {
  const Label = () => {
    switch (mode) {
      case "pr":
        return (
          <StPrimaryLabel onClick={onClick} name={name}>
            {children}
          </StPrimaryLabel>
        );
      case "second":
        return (
          <StSecondaryLabel onClick={onClick} name={name}>
            {children}
          </StSecondaryLabel>
        );
      default:
        return (
          <StPrimaryLabel onClick={onClick} name={name}>
            {children}
          </StPrimaryLabel>
        );
    }
  };
  return <Label />;
};

export default StLabel;

export const StPrimaryLabel = styled.button`
  padding: 0 8px;
  height: 38px;
  border-radius: 8px;
  border: none;
  background-color: ${(props) => props.theme.colors.black};
  color: white;
  &:hover:{

  }
`;

export const StSecondaryLabel = styled.button`
  padding: 0 8px;
  height: 38px;
  border-radius: 8px;
  border: none;
  background-color: ${(props) => props.theme.colors.lightGray};
  color: ${(props) => props.theme.colors.black};
  display: block;
  &:hover {
    background-color: rgb(171, 171, 171);
  }
`;
