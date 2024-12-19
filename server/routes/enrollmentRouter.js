const Router = require("express");
const router = new Router();

// router.post("/", );
router.get('/', function(req,res){
    res.send("enrollment api");
});
// router.get("/:id", );




module.exports = router;