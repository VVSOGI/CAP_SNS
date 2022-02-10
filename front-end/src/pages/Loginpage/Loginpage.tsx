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
      await signUp(username, password, name, email, "");
      handleNavigate("/main");
    } catch (e) {
      console.log(e);
    }
  };

  const handleSignin = async (username: string, password: string) => {
    Login(username, password)
      .then((item) => {
        handleNavigate("/main");
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <Nav />
      <SingInAndUp handleSignup={handleSignup} handleSignin={handleSignin} />
    </>
  );
};

export default Loginpage;
