import SingInAndUp from "../../components/SingInAndUp/SingInAndUp";
import Nav from "../../components/Nav/Nav";
import { useNav } from "../../router/useNav";

const Loginpage = () => {
  const handleNavigate = useNav();

  return (
    <>
      <Nav />
      <SingInAndUp handleNavigate={handleNavigate} />
    </>
  );
};

export default Loginpage;
