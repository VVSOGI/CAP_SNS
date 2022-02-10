import { useState } from "react";
import {
  PostContainer,
  LeftContainer,
  LeftBox,
  RightTotalContainer,
  RightTopContainer,
  RightBottomContainer,
} from "./styles";

export type PostStylesType = {
  isClick: boolean;
};

type PostPropsType = {
  removeCallback: (id: number) => void;
  patchCallback: (id: number, text: string) => void;
  id: number;
  username: string;
  name: string;
  time: string;
  text: string;
};

const Post: React.FC<PostPropsType> = ({
  id,
  username,
  name,
  time,
  text,
  removeCallback,
  patchCallback,
}) => {
  const [click, setClick] = useState(false);

  return (
    <PostContainer isClick={click} onClick={() => setClick(!click)}>
      <LeftContainer>
        <LeftBox>
          <span>A</span>
        </LeftBox>
      </LeftContainer>
      <RightTotalContainer>
        <RightTopContainer isClick={click}>
          <span className="username">{username}</span>
          <span className="name">{`@${name}`}</span>
          <span className="time">🕐 {time}</span>
          <span onClick={() => patchCallback(id, text)} className="fix">
            🛠
          </span>
          <span onClick={() => removeCallback(id)} className="remove">
            ❌
          </span>
        </RightTopContainer>
        <RightBottomContainer>
          <pre>{text}</pre>
        </RightBottomContainer>
      </RightTotalContainer>
    </PostContainer>
  );
};

export default Post;
