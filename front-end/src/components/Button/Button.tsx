import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.button<ButtonStylsProps>`
  position: relative;
  width: 6em;
  height: 3em;
  border: none;
  border-radius: 3px;
  background-color: ${(props) => props.bgColor};
  color: #fff;
  cursor: pointer;
  z-index: 10;
  :active {
    ::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      background-color: #ffffff3b;
      top: 0;
      left: 0;
    }
  }
`;

type ButtonStylsProps = {
  bgColor: string;
};

type ButtonProps = {
  content: string;
  callback: () => void;
  bgColor: string;
};

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <ButtonContainer bgColor={props.bgColor} onClick={() => props.callback()}>
      <span>{props.content}</span>
    </ButtonContainer>
  );
};

export default Button;
