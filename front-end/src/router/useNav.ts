import { useNavigate } from "react-router-dom";

export const useNav = () => {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    // 로그인 && 회원가입 성공시 페이지 전환.
    navigate(path);
  };
  return handleNavigate;
};
