import { Avatar, Box, Button, Grid, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";

const Registro = () => {
  const navigate = useNavigate();
  //Definicion de estados locales
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirm: "",
    birthDate: "",
  });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const validate = () => {
    let errors = {};
    if (user.password !== user.passwordConfirm)
      errors.password = "Las contraseñas no coinciden";

    if (!emailRegex.test(user.email))
      errors.email =
        "El mail ingresado no tiene formato valido (ej... usuario@gmail.com)";

    if (!passwordRegex.test(user.password))
      errors.password = "La contraseña debe tener al menos 8 caracteres";

    const today = new Date().toISOString().substring(0, 10);

    if (user.birthDate > today)
      errors.birthDate = "La fecha de nacimiento no es valida";

    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate(user);
    setError(err);
    console.log(error);
    if (err === null) {
      console.log("TODO OKI");
    }
  };
  //constantes de expresiones regulares
  const emailRegex = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{}|\\:',./?><]{8,}$/;

  return (
    <Paper elevation={10} className="fondo">
      <Grid align="center">
        <Avatar sx={{ bgcolor: "#2d9b23" }}>
          <LockIcon />
        </Avatar>
        <h3>Registrarme</h3>
      </Grid>
      {error && error.message}
      <Box component={"form"} onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="firstname"
          value={user.firstname}
          fullWidth
          required
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Apellido"
          name="lastname"
          value={user.lastname}
          fullWidth
          required
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="birthDate"
          type="date"
          value={user.birthDate}
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          value={user.email}
          fullWidth
          required
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          value={user.password}
          margin="normal"
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          label="Confirmar contraseña"
          name="passwordConfirm"
          type="password"
          value={user.passwordConfirm}
          margin="normal"
          fullWidth
          required
          onChange={handleChange}
        />
        <Button
          type="submit"
          color="success"
          fullWidth
          variant="contained"
          size="large"
        >
          Registrarme
        </Button>
      </Box>
    </Paper>
  );
};

export default Registro;
