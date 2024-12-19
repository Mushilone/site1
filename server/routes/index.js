const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const enrollmentRouter = require("./enrollmentRouter");

router.use("/user", userRouter);
router.use("/enrollment", enrollmentRouter);



module.exports = router;