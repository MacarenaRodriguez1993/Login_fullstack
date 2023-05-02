import { Avatar, Box, Button, Grid, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";

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
  const [errors, setErrors] = useState({});

  //Settear valores en la variable user
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //constantes de expresiones regulares
  const emailRegex = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{}|\\:',./?><]{8,}$/;
  const nameRegex = /^[a-zA-Z]{3,}$/;

  //Funcion para validar los datos
  const validate = () => {
    const validationError = {};
    const today = new Date().toISOString().substring(0, 10);
    if (user.password !== user.passwordConfirm) {
      validationError.password = "Las contraseñas no coinciden.";
    } else if (!passwordRegex.test(user.password)) {
      validationError.password =
        "La contraseña debe tener al menos 8 caracteres.";
    } else if (!emailRegex.test(user.email)) {
      validationError.email = "El mail ingresado no tiene formato valido.";
    } else if (user.birthDate > today) {
      validationError.birthDate = "La fecha de nacimiento no es valida.";
    } else if (!nameRegex.test(user.firstname)) {
      validationError.firstname =
        "El nombre no es valido, debe tener al menos 3 caracteres. ";
    } else if (!nameRegex.test(user.lastname)) {
      validationError.lastname =
        "El apellido no es valido, debe tener al menos 3 caracteres.";
    }
    return validationError;
  };

  //Envio de formulario y llamado a la funcion validate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validarErrors = validate();

    if (Object.keys(validarErrors).length > 0) {
      setErrors(validarErrors);
      return;
    } else {
      const resp = await axios.post(`http://www.localhost:3001/register`, user);
      console.log(resp);
      navigate("/");
    }
  };

  return (
    <Paper elevation={10} className="fondo">
      <Grid align="center">
        <Avatar sx={{ bgcolor: "#2d9b23" }}>
          <LockIcon />
        </Avatar>
        <h3>Registrarme</h3>
      </Grid>

      <Box component={"form"} onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="firstname"
          value={user.firstname}
          fullWidth
          required
          margin="normal"
          error={errors.firstname !== undefined}
          helperText={errors.firstname}
          onChange={handleChange}
        />
        <TextField
          label="Apellido"
          name="lastname"
          value={user.lastname}
          fullWidth
          required
          margin="normal"
          error={errors.lastname !== undefined}
          helperText={errors.lastname}
          onChange={handleChange}
        />
        <TextField
          name="birthDate"
          type="date"
          value={user.birthDate}
          fullWidth
          margin="normal"
          error={errors.birthDate !== undefined}
          helperText={errors.birthDate}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          value={user.email}
          fullWidth
          required
          margin="normal"
          error={errors.email !== undefined}
          helperText={errors.email}
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
          error={errors.password !== undefined}
          helperText={errors.password}
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
          error={errors.password !== undefined}
          helperText={errors.password}
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
