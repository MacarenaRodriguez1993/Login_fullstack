import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
  const [form, setForm] = useState();
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
      {user && (
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
            <div>
              <h2>Hola {user.firstname}</h2>
              <h3>Gracias por iniciar sesion con " {user.email} "</h3>
              <p>
                En esta seccion encontraras todo tus datos e informacion
                personal.
              </p>
              <p>Podes actualizar y agregar nueva informacion.</p>
            </div>
          </Box>

          <Box
            sx={{
              width: "100%",
              backgroundColor: "#aae",
              textAlign: "start",
              padding: "1em",
            }}
          >
            <Typography>Tus datos</Typography>
          </Box>
          {perfil && (
            <div style={{ textAlign: "start" }}>
              <Typography>Nombre: {perfil.firstname}</Typography>
              <Typography>Apellido : {perfil.lastname}</Typography>
              <Typography>
                Fecha de Nacimiento :{" "}
                {new Date(perfil.birthDate).toLocaleDateString("es-ES")}
              </Typography>
              <Typography>Domicilio</Typography>
              <Typography>Rol : {perfil.rol}</Typography>
              <Box style={{ display: "none" }}>
                <FormLabel>Nombre </FormLabel>
                <Input
                  value={perfil.firstname}
                  name="firstname"
                  onChange={handleChange}
                  type="text"
                />
              </Box>
              <Button
                variant="contained"
                color="success"
                onClick={handleClickOpen}
              >
                Editar info
              </Button>
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
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleSubmit}>Subscribe</Button>
                </DialogActions>
              </Dialog>
            </div>
          )}

          {/* <Box component="form" sx={{ margin: "1em", textAlign: "initial" }}> */}
          {/* <Box> */}
          {/* <FormLabel>Nombre </FormLabel> */}
          {/* <Input 
          //  value={perfil.firstname}
          //  name="firstname" // onChange={handleChange}
          //  type="text" // />
      {/*     </Box> */}
          {/* <Box> */}
          {/* <FormLabel>Apellido </FormLabel> */}
          {/* <Input placeholder="Placeholder" /> */}
          {/* </Box> */}
          {/* <Box> */}
          {/* <FormLabel>Fecha de Nacimiento </FormLabel> */}
          {/* <Input placeholder="Placeholder" type="date" /> */}
          {/* </Box> */}
          {/* <Box> */}
          {/* <FormLabel>Domicilio </FormLabel> */}
          {/* <Input placeholder="Placeholder" /> */}
          {/* </Box> */}
          {/* </Box> */}
        </>
      )}
    </>
  );
};

export default Perfil;
