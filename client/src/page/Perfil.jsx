import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Perfil = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  return (
    <>
      <Navbar />

      {user && (
        <>
          <h2>Hola {user.firstname}</h2>
          <h3>Gracias por iniciar sesion</h3>
          <p>
            En esta seccion encontraras todo tus datos e informacion personal.
            Podes actualizar y agregar nueva informacion
          </p>
        </>
      )}
    </>
  );
};

export default Perfil;
