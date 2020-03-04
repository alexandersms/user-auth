const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");

// REGISTER
router.post("/register", async (req, res) => {
  // Validation des données
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //vérifier si l'utilisateur est déjà dans la base de données
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("l'email existe déjà");

  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Creation nouvel utilisateur
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  // Validation des données
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //vérifier si l'email est déjà dans la base de données
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("l'e-mail est introuvable");

  // Mot de passe correcte
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send("Mot de passe invalide")

  // créer et attribuer un token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token)

});

module.exports = router;
