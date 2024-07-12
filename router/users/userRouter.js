const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../../models/users');
const asyncHandler = require('../../utils/asyncHandler')

const SignupJoi = require('../../validation/singnupJoi')

router.post('/sign-up', asyncHandler(async (req, res) => {
  const { error } = SignupJoi.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    isAdmin: false,
  });

  await newUser.save();
  res.status(201).send('User registered successfully');
}));

router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid email or password');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  res.send('Logged in successfully');
}));

module.exports = router;
