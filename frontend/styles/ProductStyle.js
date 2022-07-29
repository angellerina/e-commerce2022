import styled from "styled-components";

export const ProductSyles = styled.div`
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  justify-content: center;

  img {
    width: 100%;
    cursor: pointer;
  }

  img:hover {
    color: red;
  }

  h2 {
    padding: 0.5rem 0rem;
  }
`;
