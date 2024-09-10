var router = require('express').Router();


const userRouter = require('./users.js');
const channelRouter = require('./channels.js');


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 정보 관리
 */
router.use("/", userRouter);


/**
 * @swagger
 * tags:
 *   name: Channels
 *   description: 채널 업로드, 보기, 수정, 삭제
 */
router.use("/channels", channelRouter);
module.exports = router;
