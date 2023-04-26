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
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <Paper elevation={10} className="fondo">
      <Grid align="center">
        <Avatar sx={{ bgcolor: "#2d9b23" }}>
          <LockIcon />
        </Avatar>
        <h3>Iniciar Sesion</h3>
      </Grid>
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
          onClick={handleSubmit}
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
