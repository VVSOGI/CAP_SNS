import styled from "styled-components";
import { BoardStyleProps } from "./Board";

export const BoardContainer = styled.main`
  position: relative;
  width: 100%;
  height: 90vh;
  background-color: #e9e9e9;
  display: flex;
  overflow: hidden;
`;

export const LeftContainer = styled.section`
  flex: 11;
  background-color: #f2f2f2;
  padding: 2em 3em;
  overflow: scroll;
`;

// 글 작성 컨테이너

export const WriteContainer = styled.div`
  width: 100%;
  min-height: 5em;
  display: flex;
  margin-bottom: 2em;
  position: relative;
`;

export const WriteLeftContainer = styled.div`
  flex: 1;
`;

export const WriteLeftBox = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b66767;
  border-radius: 50%;
  div {
    color: #fff;
  }
`;

export const WriteRightContainer = styled.div<BoardStyleProps>`
  flex: 12;
  display: flex;
  flex-direction: column;
  position: relative;
  .textarea {
    min-width: 100%;
    padding: 0.5em 0em;
    border: none;
    resize: none;
    outline: none;
    position: relative;
    background-color: transparent;
    border-bottom: 1px solid #d8d8d8;
  }
`;

export const WriteRightBottomBox = styled.div<BoardStyleProps>`
  position: relative;
  padding: 0.5em 0;
  width: 100%;
  max-height: 50%;
  display: ${(props) => {
    return !props.writeClick ? "none" : "flex";
  }};
  justify-content: end;
  .gap {
    margin: 0.2em;
  }
`;

export const WriteLine = styled.div<BoardStyleProps>`
  position: absolute;
  display: flex;
  justify-content: center;
  top: -1px;
  left: 0;
  width: 100%;
  height: 1px;
  z-index: 0;
  ::before {
    transition: 1s;
    content: "";
    width: ${(props) => {
      return !props.writeClick ? "0%" : "100%";
    }};
    height: 1px;
    background-color: #000;
  }
`;

// 글 작성 컨테이너 끝
