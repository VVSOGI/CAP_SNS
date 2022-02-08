import styled from "styled-components";
import { PostStylesType } from "./Post";

export const PostContainer = styled.div<PostStylesType>`
  cursor: ${(props) => {
    return props.isClick ? "default" : "pointer";
  }};
  position: relative;
  width: 100%;
  min-height: 100px;
  display: flex;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 2em 0;
  margin-bottom: 1em;
  background-color: #fff;
  :hover {
    background-color: #f5f5f5;
  }
`;

export const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LeftBox = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #b19727;
  color: #fff;
`;

export const RightTotalContainer = styled.div`
  flex: 8;
  display: flex;
  flex-direction: column;
`;

export const RightTopContainer = styled.div<PostStylesType>`
  max-height: 2em;
  display: flex;
  align-items: center;
  position: relative;
  span {
    margin: 0 0.3em;
  }
  .username {
    font-size: 18px;
    font-weight: 800;
  }
  .name {
    color: #1671c5;
    font-weight: 700;
  }
  .time {
    font-size: 12px;
  }
  .fix {
    z-index: 10;
    cursor: ${(props) => {
      return props.isClick ? "pointer" : "default";
    }};
    display: ${(props) => {
      return props.isClick ? "block" : "none";
    }};
    position: absolute;
    right: 3em;
  }
  .remove {
    z-index: 10;
    cursor: ${(props) => {
      return props.isClick ? "pointer" : "default";
    }};
    display: ${(props) => {
      return props.isClick ? "block" : "none";
    }};
    position: absolute;
    right: 1em;
  }
`;

export const RightBottomContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0.5em 2em 0 0.2em;
  pre {
    overflow-wrap: break-word;
    white-space: pre-wrap;
  }
`;
