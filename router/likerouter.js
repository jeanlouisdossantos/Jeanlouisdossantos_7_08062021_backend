const {Router} = require('express')
const router = Router()
const likecontrol = require("../controllers/likecontrol")
const auth = require("../middleware/auth")


router.post("/", likecontrol.createOneLike)
router.delete("/",  likecontrol.createOneLike)


module.exports = router