import Board from "../../components/Board/Board";
import Nav from "../../components/Nav/Nav";

const Mainpage = () => {
  return (
    <>
      <Nav isLogin={true} />
      <Board />
    </>
  );
};

export default Mainpage;
