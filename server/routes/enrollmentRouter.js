const Router = require("express");
const router = new Router();
const enrollmentController = require("../controllers/enrollmentController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get('/', authMiddleware, enrollmentController.get);
router.get("/:id", authMiddleware, enrollmentController.getId);
router.post("/", authMiddleware, enrollmentController.post);
router.put("/", authMiddleware, enrollmentController.put);
router.delete("/:id", authMiddleware, enrollmentController.delete);


module.exports = router;