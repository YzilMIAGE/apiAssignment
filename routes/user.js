const User = require("../model/user");
const jwt = require("jsonwebtoken");
const BCrypt = require("bcrypt");
const { JWT_TOKEN } = require("../constant/constant");

const registerHandler = async (req, res) => {
  const aLastName = req.body.lastName;
  const aFirstName = req.body.firstName;
  const aMail = req.body.mail.toLowerCase();
  const aPassword = req.body.password;

  const aUser = await User.findOne({ mail: aMail });

  if (aUser) {
    return res.status(400).send();
  }

  const aHashedPassword = await BCrypt.hash(aPassword, 12);

  const aNewUser = new User({
    role: "user",
    lastName: aLastName,
    firstName: aFirstName,
    mail: aMail,
    password: aHashedPassword,
  });

  await aNewUser.save();

  const anAccessToken = jwt.sign(
    { _id: aNewUser._id.toString(), mail: aNewUser.mail },
    JWT_TOKEN
  );

  aNewUser.password = undefined;

  return res.json({ user: aNewUser, token: anAccessToken });
};

const loginHandler = async (req, res) => {
  const aMail = req.body.mail.toLowerCase();
  const aPassword = req.body.password;

  const aUser = await User.findOne({ mail: aMail });

  if (!aUser) {
    return res.status(404).send();
  }

  const isPasswordCorrect = await BCrypt.compare(aPassword, aUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).send();
  }

  const anAccessToken = jwt.sign(
    { _id: aUser._id.toString(), mail: aUser.mail },
    JWT_TOKEN
  );

  aUser.password = undefined;

  return res.json({ user: aUser, token: anAccessToken });
};

const getUserHandler = async (req, res) => {
  const aUser = await User.findById(req.params.id);

  aUser.password = undefined;

  return res.json(aUser);
};

module.exports = {
  registerHandler,
  loginHandler,
  getUserHandler,
};
