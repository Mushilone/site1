const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
 

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/auth", authMiddleware, userController.check);
router.post("/password", authMiddleware, userController.checkPassword);

router.get("/", authMiddleware, userController.get);
router.get("/:id", authMiddleware, userController.getId);
router.put("/", authMiddleware, userController.put);



module.exports = router;