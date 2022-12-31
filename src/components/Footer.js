import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <StFooter>
      <p>Copyright &copy; Clone Project in Fouth</p>
    </StFooter>
  );
};

export default Footer;

const StFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(120, 120, 120);
  margin: 0;
  height: 100px;
  background-color: rgba(229, 232, 232, 0.9);
`;
