import SingInAndUp from "../../components/SingInAndUp/SingInAndUp";
import Nav from "../../components/Nav/Nav";
import { useNav } from "../../router/useNav";
import { Login, signUp } from "../../Api/auth";

const Loginpage = () => {
  const handleNavigate = useNav();

  const handleSignup = async (
    username: string,
    password: string,
    name: string,
    email: string
  ) => {
    try {
      const signup = await signUp(username, password, name, email, "");
      handleNavigate("/main", { state: signup.data.username });
    } catch (e) {}
  };

  const handleSignin = async (username: string, password: string) => {
    const login = await Login(username, password);
    handleNavigate("/main", { state: login.data.username });
  };

  return (
    <>
      <Nav />
      <SingInAndUp handleSignup={handleSignup} handleSignin={handleSignin} />
    </>
  );
};

export default Loginpage;
