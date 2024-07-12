const router = require('express').Router();
const userRouter = require('../router/users/userRouter');

router.use('/users', userRouter);

module.exports = router;
