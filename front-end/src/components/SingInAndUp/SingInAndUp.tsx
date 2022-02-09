import { useState } from "react";
import styled from "styled-components";
import { Login, signUp } from "../../Api/auth";
import { getToken } from "../../db/token";

const TotalContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OutWallContainer = styled.div`
  width: 30%;
  min-height: 50%;
  padding-bottom: 3em;
  border: 1px solid black;
  position: relative;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  .title {
    margin-top: 10%;
  }
  .signUpChange {
    margin-top: 0.5em;
    left: 0;
    input {
      margin-right: 0.5em;
    }
  }
  .signInbtn {
    margin-top: 1em;
    width: 75%;
    height: 3.5em;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  input {
    padding: 1em;
    margin: 0.5em;
  }
`;

type SingInAndUpPropsType = {
  handleNavigate: (path: string) => void;
};
const SingInAndUp: React.FC<SingInAndUpPropsType> = ({ handleNavigate }) => {
  const [changeSign, setChangeSign] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case "username":
        return setUsername(value);
      case "password":
        return setPassword(value);
      case "name":
        return setName(value);
      case "email":
        return setEmail(value);
      default:
    }
  };

  const handleSignup = async () => {
    try {
      await signUp(username, password, name, email, "");
      handleNavigate("/main");
    } catch (e) {
      console.log(e);
    }
  };

  const handleSignin = async () => {
    Login(username, password)
      .then((item) => {
        handleNavigate("/main");
      })
      .catch((e) => console.error(e));
  };

  return (
    <TotalContainer>
      <OutWallContainer>
        <h1 className="title">{changeSign ? "Sign Up" : "Sign In"}</h1>
        {changeSign ? (
          <InputContainer>
            <input
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="아이디를 입력해주세요."
            />
            <input
              onChange={handleChange}
              name="password"
              type="text"
              placeholder="비밀번호를 입력해주세요."
            />
            <input //
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="이름을 입력해주세요."
            />
            <input
              onChange={handleChange}
              name="email"
              type="text"
              placeholder="이메일을 입력해주세요."
            />
          </InputContainer>
        ) : (
          <InputContainer>
            <input
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="아이디를 입력해주세요."
            />
            <input
              onChange={handleChange}
              name="password"
              type="text"
              placeholder="비밀번호를 입력해주세요."
            />
          </InputContainer>
        )}
        <div className="signUpChange">
          <input
            type="checkbox"
            onClick={() => {
              setChangeSign(!changeSign);
              setName("");
              setEmail("");
            }}
          />
          <span>회원가입이 필요하시면 왼쪽 버튼을 눌러주세요.</span>
        </div>
        {changeSign ? (
          <button onClick={handleSignup} className="signInbtn">
            Sign Up
          </button>
        ) : (
          <button onClick={handleSignin} className="signInbtn">
            Sign In
          </button>
        )}
      </OutWallContainer>
    </TotalContainer>
  );
};

export default SingInAndUp;
