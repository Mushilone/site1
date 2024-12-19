const Router = require("express");
const router = new Router();
const enrollmentController = require("../controllers/enrollmentController");

router.get('/', enrollmentController.get);
router.get("/:id", enrollmentController.getId);
router.post("/", enrollmentController.post);
router.put("/", enrollmentController.put);
router.delete("/:id", enrollmentController.delete);


module.exports = router;