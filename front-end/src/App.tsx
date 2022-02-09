import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Loginpage from "./pages/Loginpage/Loginpage";
import Mainpage from "./pages/Mainpage/Mainpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/main/*" element={<Mainpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
