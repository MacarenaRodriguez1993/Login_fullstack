import { Avatar, Box, Grid, Paper, TextField } from "@mui/material";
import { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
const Registro = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    birthDate: "",
  });
  return (
    <Paper elevation={10} className="fondo">
      <Grid align="center">
        <Avatar sx={{ bgcolor: "#2d9b23" }}>
          <LockIcon />
        </Avatar>
        <h3>Registrarme</h3>
      </Grid>
      <Box component={"form"}>
        <TextField
          label="Email"
          name="email"
          value={user.email}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          value={user.password}
          margin="normal"
          fullWidth
          required
        />
      </Box>
    </Paper>
  );
};

export default Registro;
