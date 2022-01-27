const {Router} = require('express')
const router = Router()
const likecontrol = require("../controllers/likecontrol")
const auth = require("../middleware/auth")


router.post("/",auth, likecontrol.createOneLike)
router.delete("/", auth,  likecontrol.deleteOneLike)


module.exports = router