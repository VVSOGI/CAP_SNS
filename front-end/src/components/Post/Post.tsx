import { useEffect, useState } from "react";
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
  postOwner: string;
  username: unknown;
  name: string;
  time: string;
  text: string;
};

const Post: React.FC<PostPropsType> = ({
  id,
  name,
  time,
  text,
  username,
  postOwner,
  removeCallback,
  patchCallback,
}) => {
  const [click, setClick] = useState(false);

  const handleIsMyPost = (currentUser: unknown, postOwner: string) => {
    const check = currentUser === postOwner;
    if (check) {
      setClick(!click);
    }
  };

  return (
    <PostContainer
      isClick={click}
      onClick={() => handleIsMyPost(username, postOwner)}
    >
      <LeftContainer>
        <LeftBox>
          <span>A</span>
        </LeftBox>
      </LeftContainer>
      <RightTotalContainer>
        <RightTopContainer isClick={click}>
          <span className="username">{postOwner}</span>
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
