import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();

  //Definicion de estados locales
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState();
  //Settear valores en la variable user
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //Envio de credenciales
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://www.localhost:3001/login`, user)
      .then((response) => {
        // Manejar la respuesta exitosa
        const resp = response.data;
        localStorage.setItem("user", JSON.stringify(resp));
        navigate("/perfil");
      })
      .catch((error) => {
        // Manejar el error
        setErrors(error.response.data.err);
      });
  };

  return (
    <Paper elevation={10} className="fondo">
      <Grid align="center">
        <Avatar sx={{ bgcolor: "#2d9b23" }}>
          <LockIcon />
        </Avatar>
        <h3>Iniciar Sesion</h3>
      </Grid>
      {errors && <h2 style={{ color: "red" }}>{errors}</h2>}

      <Box component={"form"} onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          value={user.email}
          fullWidth
          required
          margin="normal"
          onChange={(e) => handleChange(e)}
        />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          value={user.password}
          margin="normal"
          fullWidth
          required
          onChange={(e) => handleChange(e)}
        />
        <FormControlLabel control={<Checkbox />} label="Recordar contraseña" />
        <Button
          type="submit"
          color="success"
          fullWidth
          variant="contained"
          size="large"
        >
          Iniciar Sesion
        </Button>
        <Link href="/">Recuperar contraseña</Link>
        <Typography>
          ¿Aún no estas registrado? <Link href="/registro">Registrarme</Link>
        </Typography>
      </Box>
    </Paper>
  );
};

export default Login;
