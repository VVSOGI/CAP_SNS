/* eslint-disable react-hooks/exhaustive-deps */
import TextareaAutosize from "react-textarea-autosize";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import Post from "../Post/Post";
import {
  createPostsApi,
  deletePostsApi,
  getPostsEachData,
  updatePostsApi,
} from "../../Api/post";
import { getPosts } from "../../modules/post";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import {
  BoardContainer,
  LeftContainer,
  WriteContainer,
  WriteLeftContainer,
  WriteLeftBox,
  WriteRightContainer,
  WriteRightBottomBox,
  WriteLine,
} from "./styles";
import styled from "styled-components";
import { useNav } from "../../router/useNav";
import { useLocation } from "react-router-dom";
import { callSocket, onSync } from "../../network/socket";

const RightContainer = styled.section`
  flex: 5;
  background-color: #fff;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Profile = styled.div`
  position: fixed;
  box-shadow: 0 0px 5px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  width: 25%;
  height: 80%;
  top: 15%;
`;

export type BoardStyleProps = {
  writeClick: boolean;
};

const Board = () => {
  const [writeContent, setWriteContent] = useState("");
  const [isWriteClick, setIsWriteClick] = useState(false);
  const [isFixMode, setIsFixMode] = useState([-1, false]);
  const [isToken, setIsToken] = useState(true);
  const [line, setLine] = useState(false);

  const { posts, error, loading } = useSelector(
    (state: RootState) => state.posts.posts
  );
  const dispatch = useDispatch();
  const navigation = useNav();
  const { state } = useLocation();

  const handleCreatePost = async () => {
    // Post 생성
    if (writeContent.length > 0) {
      try {
        await createPostsApi(writeContent);
      } catch (e) {
        setIsToken(false);
      }
      dispatch(getPosts(""));
      setWriteContent("");
      let io = callSocket();
      onSync(io, "posts");
    }
  };

  const handleCancelClick = () => {
    // 취소 버튼 클릭
    setIsWriteClick(!isWriteClick);
    setIsFixMode([-1, false]);
    setWriteContent("");
  };

  const handleRemovePost = async (id: number) => {
    // Post 제거
    try {
      await deletePostsApi(id);
    } catch (e) {
      setIsToken(false);
    }
    dispatch(getPosts(""));
  };

  const handlePatchPostBeforeText = (id: number, text: string) => {
    // Post 업데이트 이전 준비
    setWriteContent(text);
    setIsFixMode([id, true]);
    setIsWriteClick(true);
  };

  const handlePatchPostAfterText = async () => {
    // Post 업데이트 완료
    const [targetId, isFix] = isFixMode;
    if (isFix) {
      try {
        await updatePostsApi(Number(targetId), writeContent);
      } catch (e) {
        setIsToken(false);
      }
      setWriteContent("");
      setIsFixMode([-1, false]);
      setIsWriteClick(false);
      dispatch(getPosts(""));
    }
  };

  useEffect(() => {
    if (!isToken) navigation("/");
    return () => {
      setWriteContent("");
      setIsWriteClick(false);
      setLine(false);
      setIsFixMode([-1, false]);
    };
  }, [isToken]);

  useEffect(() => {
    // Posts 데이터 호출
    dispatch(getPosts(""));
  }, []);

  useEffect(() => {
    if (isWriteClick) {
      setLine(true);
    } else {
      setLine(false);
    }
  }, [isWriteClick]);
  // 비동기로 line을 한 박자 느리게 그린다.
  return (
    <BoardContainer>
      <LeftContainer>
        <WriteContainer>
          <WriteLeftContainer>
            <WriteLeftBox>
              <div>U</div>
            </WriteLeftBox>
          </WriteLeftContainer>

          <WriteRightContainer writeClick={line}>
            <TextareaAutosize
              onClick={() => setIsWriteClick(true)}
              onChange={(e) => setWriteContent(e.target.value)}
              value={writeContent}
              className="textarea"
              placeholder="게시물을 올려보세요!"
              minRows={1}
              maxRows={30}
            />
            <WriteRightBottomBox writeClick={isWriteClick}>
              <WriteLine writeClick={line} />
              <Button
                content="CANCEL"
                bgColor="#4e4e4e"
                callback={() => handleCancelClick()}
              />
              <div className="gap"></div>
              {isFixMode[1] ? (
                <Button
                  content="UPDATE"
                  bgColor="#2269b9"
                  callback={() => handlePatchPostAfterText()}
                />
              ) : (
                <Button
                  content="POST"
                  bgColor="#2269b9"
                  callback={() => handleCreatePost()}
                />
              )}
            </WriteRightBottomBox>
          </WriteRightContainer>
        </WriteContainer>

        {posts?.map((item: getPostsEachData) => (
          <Post
            key={item.id}
            id={item.id}
            postOwner={item.username}
            name={item.name}
            text={item.text}
            time={item.createdAt}
            username={state}
            removeCallback={handleRemovePost}
            patchCallback={handlePatchPostBeforeText}
          />
        ))}
      </LeftContainer>

      <RightContainer>
        <Profile />
      </RightContainer>
    </BoardContainer>
  );
};

export default Board;
