// Styles
import styled from "styled-components";

export default function User() {
  return (
    <FooterContainer>
      Made with love by
      <a href="https://sabrina-portfolio.netlify.app/">Sabrina A. Castillo</a>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 15px;
  height: 150px;
  width: 100%;

  a {
    margin-left: 4px;
    font-weight: bold;
  }

  a:hover {
    color: #dc85b1;
  }
`;
