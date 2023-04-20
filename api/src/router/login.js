const Router = require("express");
const router = Router();
const User = require("../model/Login");

router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {});

router.post("/login", async (req, res) => {
  console.log("ola");
  const data = req.body;
  try {
    await User.create(data);
    res.status(201).json(data);
  } catch (error) {
    res.status(404).json({ err: error.message });
  }
});

router.post("/register", (req, res) => {});
router.put("/user", (req, res) => {});
router.delete("/user/:id", (req, res) => {});

module.exports = router;
