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
  const [errorsValidation, setErrorsValidation] = useState({});
  const [errors, setErrors] = useState();
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
      setErrorsValidation(validarErrors);
      return;
    } else {
      await axios
        .post(`http://www.localhost:3001/register`, user)
        .then((resp) => {
          localStorage.setItem("user", JSON.stringify(resp.data));
          navigate(`/perfil/${user.id}`);
        })
        .catch((error) => {
          setErrors(error.response.data.err);
        });
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
      {errors && <h2 style={{ color: "red" }}>{errors}</h2>}
      <Box component={"form"} onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="firstname"
          value={user.firstname}
          fullWidth
          required
          margin="normal"
          error={errorsValidation.firstname !== undefined}
          helperText={errorsValidation.firstname}
          onChange={handleChange}
        />
        <TextField
          label="Apellido"
          name="lastname"
          value={user.lastname}
          fullWidth
          required
          margin="normal"
          error={errorsValidation.lastname !== undefined}
          helperText={errorsValidation.lastname}
          onChange={handleChange}
        />
        <TextField
          name="birthDate"
          type="date"
          value={user.birthDate}
          fullWidth
          margin="normal"
          error={errorsValidation.birthDate !== undefined}
          helperText={errorsValidation.birthDate}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          value={user.email}
          fullWidth
          required
          margin="normal"
          error={errorsValidation.email !== undefined}
          helperText={errorsValidation.email}
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
          error={errorsValidation.password !== undefined}
          helperText={errorsValidation.password}
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
          error={errorsValidation.password !== undefined}
          helperText={errorsValidation.password}
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
