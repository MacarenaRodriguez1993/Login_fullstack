import { Route, Routes } from "react-router-dom";
import "./App.css";
import Registro from "./page/Registro";
import Home from "./page/Home";
import Login from "./page/Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};
export default App;
