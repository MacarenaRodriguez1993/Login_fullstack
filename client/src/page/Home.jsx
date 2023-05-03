import { Button } from "@mui/material";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
const Home = () => {
  //Estados globales
  const [user, setUser] = useState();
  const [usuarios, setUsuarios] = useState();

  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, []);

  //Funcion de prueba(acciona boton y permite ver usuarios registrados)
  const handleClick = async () => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      const { token } = JSON.parse(loggedUser);
      const newToken = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: newToken,
        },
      };
      await axios.get("http://www.localhost:3001/", config).then((response) => {
        setUsuarios(response.data);
      });
    }
  };

  return (
    <>
      <Navbar />
      <h1>Home</h1>
      <p>
        En esta seccion encontraras todo lo relacionado a home todo lo general.
      </p>
      <ul style={{ width: "200px", margin: "auto" }}>
        <li>Noticias</li>
        <li>Novedades</li>
        <li>inscripcion</li>
      </ul>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit neque
        fuga, cupiditate ab fugiat inventore provident nihil quos laborum
        eligendi unde molestias maiores doloribus dolorem, sint earum expedita
        reprehenderit iste.
      </p>
    </>
  );
};

export default Home;
