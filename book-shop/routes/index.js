var router = require('express').Router();
const userRouter = require('./users.js');
const bookRouter = require('./books.js');
const likeRouter = require('./likes.js');
const orderRouter = require('./orders.js');
const cartRouter = require('./carts.js');



router.use("/users", userRouter);
router.use("/books", bookRouter);
router.use("/likes", likeRouter);
router.use("/orders", orderRouter);
router.use("/carts", cartRouter);

module.exports = router;
