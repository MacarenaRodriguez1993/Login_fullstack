require("dotenv").config();
const { PORT } = process.env;

const server = require("./src/app");
const sequelize = require("./src/db");

sequelize
  .sync({ force: true })
  .then(() => {
    server.listen(PORT, () =>
      console.log(`La aplicación está funcionando en el puerto ${PORT}`)
    );
  })
  .catch((error) =>
    console.log("Error al conectarse a la base de datos:", error)
  );
