require("dotenv").config();
const Router = require("express");
const router = Router();
const User = require("../model/Login");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = process.env;
const { verifyToken } = require("../middleware/auth");

router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

router.get("/perfil/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const userById = await User.findByPk(id);
    res.status(200).json(userById);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (user === null) {
      throw new Error(`El mail ${email} no esta registrado`);
    }
    const correctPassword = await bcrypt.compare(password, user.password);
    if (correctPassword) {
      const infoForToken = {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      };
      const token = jwt.sign(infoForToken, TOKEN_SECRET);
      const dataEnvio = { ...infoForToken, token };
      res.status(200).json(dataEnvio);
    } else throw new Error("credenciales incorrectas");
  } catch (error) {
    res.status(404).json({ err: error.message });
  }
});

router.post("/register", async (req, res) => {
  const { firstname, lastname, email, birthDate } = req.body;
  const passwordHash = bcrypt.hashSync(req.body.password, 10);
  try {
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (user === null) {
      await User.create({
        firstname,
        lastname,
        email: email.toLowerCase(),
        birthDate,
        password: passwordHash,
      }).then((u) => {
        const infoToken = {
          id: u.id,
          email,
          firstname,
          lastname,
        };
        const token = jwt.sign(infoToken, TOKEN_SECRET);
        const dataEnvio = { ...infoToken, token };
        res.status(200).json(dataEnvio);
      });
    } else {
      throw new Error(
        `El mail ${email} ya fue registrado, no puede duplicarse`
      );
    }
  } catch (error) {
    res.status(404).json({ err: error.message });
  }
});
router.put("/perfil/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.firstname = data.firstname;
      user.lastname = data.lastname;
      user.birthDate = data.birthDate;
      await user.save();
      res.status(200).send(user);
    } else {
      throw new Error("El usuario no fue encontrado");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete("/user/:id", (req, res) => {});

module.exports = router;
