import styled from "styled-components/macro";

const Button = styled.button`
  margin-top: 10px;
  height: 2rem;
  border-radius: 25px;
  border: none;
  cursor: pointer;

  &&:hover {
    background-color: lightgray;
  }
`;

export default Button;
