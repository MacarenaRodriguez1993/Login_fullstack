require("dotenv").config();
const Router = require("express");
const router = Router();
const User = require("../model/Login");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = process.env;
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

router.get("/:id", (req, res) => {});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user === null) {
      throw new Error("El usuario no existe");
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
      res.status(200).json(token);
    } else throw new Error("credenciales incorrectas");
  } catch (error) {
    res.status(404).json({ err: error.message });
  }
});

router.post("/register", async (req, res) => {
  const { firstname, lastname, email, birthDate } = req.body;
  const passwordHash = bcrypt.hashSync(req.body.password, 10);
  try {
    await User.create({
      firstname,
      lastname,
      email,
      birthDate,
      password: passwordHash,
    }).then((u) => {
      res.status(201).json(u);
    });
  } catch (error) {
    res.status(404).json({ err: error.message });
  }
});
router.put("/user", (req, res) => {});
router.delete("/user/:id", (req, res) => {});

module.exports = router;
