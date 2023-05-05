import { Route, Routes } from "react-router-dom";
import "./App.css";
import Registro from "./page/Registro";
import Home from "./page/Home";
import Login from "./page/Login";
import Perfil from "./page/Perfil";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil/:id" element={<Perfil />} />
      </Routes>
    </>
  );
};
export default App;
