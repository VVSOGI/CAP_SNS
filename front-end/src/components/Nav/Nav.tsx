import React from "react";
import styled from "styled-components";

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

const RightContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-around;
`;

const Nav = () => {
  return (
    <NavContainer>
      <LeftContainer>
        <NavIcon>🎓</NavIcon>
        <span className="app-title">CAP</span>
        <span className="userinfo">@User</span>
      </LeftContainer>
      <RightContainer>
        <span>All posts</span>
        <span>My posts</span>
        <span>Logout</span>
      </RightContainer>
    </NavContainer>
  );
};

export default Nav;
