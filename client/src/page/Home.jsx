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
      <Button disabled={!user} variant="contained" onClick={handleClick}>
        Ver Usuarios Registrados
      </Button>
      {usuarios?.map((u) => {
        return <h2 key={u.id}>{u.email}</h2>;
      })}
    </>
  );
};

export default Home;
