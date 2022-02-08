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
  const [line, setLine] = useState(false);

  const { posts, error, loading } = useSelector(
    (state: RootState) => state.posts.posts
  );
  const dispatch = useDispatch();

  const handleCreatePost = () => {
    // Post 생성
    if (writeContent.length > 0) {
      createPostsApi(writeContent);
      dispatch(getPosts(""));
      setWriteContent("");
    }
  };

  const handleCancelClick = () => {
    // 취소 버튼 클릭
    setIsWriteClick(!isWriteClick);
    setIsFixMode([-1, false]);
    setWriteContent("");
  };

  const handleRemovePost = (id: number) => {
    // Post 제거
    deletePostsApi(id);
    dispatch(getPosts(""));
  };

  const handlePatchPostBeforeText = (id: number, text: string) => {
    // Post 업데이트 이전 준비
    setWriteContent(text);
    setIsFixMode([id, true]);
    setIsWriteClick(true);
  };

  const handlePatchPostAfterText = () => {
    // Post 업데이트 완료
    const [targetId, isFix] = isFixMode;
    if (isFix) {
      updatePostsApi(Number(targetId), writeContent);
      setWriteContent("");
      setIsFixMode([-1, false]);
      setIsWriteClick(false);
      dispatch(getPosts(""));
    }
  };

  useEffect(() => {
    // Posts 데이터 호출
    dispatch(getPosts(""));
  }, [dispatch]);

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
            username={item.username}
            name={item.name}
            text={item.text}
            time={item.createdAt}
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
