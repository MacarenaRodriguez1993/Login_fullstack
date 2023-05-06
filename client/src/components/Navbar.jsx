import { AppBar, Link, Button, Typography, Box } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import "./navbar.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const logout = () => {
    console.log("CERRAR");
    if (confirm("estas seguro de cerar sesion?")) {
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    }
  };

  return (
    <AppBar>
      <Box component="div" className="nav">
        <Link href="/" color="#fff">
          <Box component="div" sx={{ display: "flex" }}>
            <AdbIcon
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            />
            <Typography color="inherit">Home</Typography>
          </Box>
        </Link>
        <Box component="div">
          {user ? (
            <>
              <Link href={`/perfil/${user.id}`} sx={{ margin: "1em" }}>
                <Button color="secondary" variant="contained">
                  Perfil
                </Button>
              </Link>
              <Link>
                <Button onClick={logout} color="error" variant="contained">
                  Salir
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" sx={{ margin: "1em" }}>
                <Button margin="normal" color="success" variant="contained">
                  Login
                </Button>
              </Link>
              <Link href="/registro" sx={{ margin: "1em" }}>
                <Button color="success" variant="contained">
                  Registro
                </Button>
              </Link>
            </>
          )}
        </Box>
      </Box>
    </AppBar>
  );
};

export default Navbar;
