import React from "react";
import styled from "styled-components";
import { clearToken } from "../../db/token";
import { useNav } from "../../router/useNav";

const NavContainer = styled.div`
  width: 100%;
  height: 5em;
  padding: 0em 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #174b24;
`;

const LeftContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 20%;
  .app-title {
    font-size: 2em;
    font-weight: 900;
  }
  .userinfo {
    color: #1264b1;
  }
`;

const NavIcon = styled.div`
  font-size: 2em;
`;

const RightContainer = styled.div<NavStylesProps>`
  width: 30%;
  display: ${(props) => {
    return props.isLogin ? "flex" : "none";
  }};
  justify-content: space-around;
  span {
    cursor: pointer;
    :hover {
      color: #2758c2;
    }
  }
`;

type NavStylesProps = {
  isLogin?: boolean;
};

type NavPropsType = {
  isLogin?: boolean;
};

const Nav: React.FC<NavPropsType> = ({ isLogin }) => {
  const handleNavigate = useNav();
  return (
    <NavContainer>
      <LeftContainer>
        <NavIcon>🎓</NavIcon>
        <span className="app-title">CAP</span>
        <span className="userinfo">@User</span>
      </LeftContainer>
      <RightContainer isLogin={isLogin}>
        <span>All posts</span>
        <span>My posts</span>
        <span
          onClick={() => {
            handleNavigate("/");
            clearToken();
          }}
        >
          Logout
        </span>
      </RightContainer>
    </NavContainer>
  );
};

export default Nav;
