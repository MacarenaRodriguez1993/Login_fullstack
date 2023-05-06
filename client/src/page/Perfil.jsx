import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import intance from "../service/interceptor";
import imagePerfil from "../asset/perfil.png";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useParams } from "react-router-dom";
const Perfil = () => {
  const { id } = useParams();
  //Declaracion de estados locales
  const [user, setUser] = useState();
  const [perfil, setPerfil] = useState();

  //estado para abrir y cerrar modal
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    getData(id);
  }, [id]);

  const getData = async (id) => {
    await intance.get(`perfil/${id}`).then((resp) => {
      setPerfil(resp.data);
    });
  };
  const handleChange = (e) => {
    setPerfil({
      ...perfil,
      [e.target.name]: e.target.value,
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    await intance.put(`perfil/${perfil.id}`, perfil).then((resp) => {
      console.log(resp.data);
    });
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };
  return (
    <>
      <Navbar />
      {perfil && (
        <>
          <Box
            padding="1em"
            sx={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <div>
              <img
                src={imagePerfil}
                alt=""
                style={{ width: "200px", borderRadius: "10%" }}
              />
              <Button color="success">
                <BorderColorIcon />
              </Button>
            </div>
            <Box>
              <h2>Hola {perfil.firstname}</h2>
              <h3>Gracias por iniciar sesion con " {perfil.email} "</h3>
              <p>
                En esta seccion encontraras todo tus datos e informacion
                personal.
              </p>
              <p>Podes actualizar y agregar nueva informacion.</p>
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              backgroundColor: "#1f90ff",
              textAlign: "start",
              padding: "1em",
              color: "#fff",
              marginTop: "3em",
              marginBottom: "3em",
            }}
          >
            <Typography>Tus datos</Typography>
          </Box>
          {perfil && (
            <div style={{ textAlign: "start", marginLeft: "0.5em" }}>
              <Typography>Nombre: {perfil.firstname}</Typography>
              <Typography>Apellido : {perfil.lastname}</Typography>
              <Typography>
                Fecha de Nacimiento :{" "}
                {new Date(perfil.birthDate).toUTCString().slice(4, 16)}
              </Typography>
              <Typography>Rol : {perfil.rol}</Typography>
              <Button
                variant="contained"
                color="success"
                onClick={handleClickOpen}
                sx={{ marginTop: "0.5em" }}
              >
                Editar info
              </Button>

              {/* Modal de dialogo para editar informacion personal */}
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Editar Información Personal</DialogTitle>
                <DialogContent>
                  <TextField
                    margin="dense"
                    id="firstname"
                    name="firstname"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={perfil.firstname}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    id="lastname"
                    name="lastname"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={perfil.lastname}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    fullWidth
                    variant="standard"
                    value={perfil.birthDate}
                    onChange={handleChange}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Editar
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Perfil;
