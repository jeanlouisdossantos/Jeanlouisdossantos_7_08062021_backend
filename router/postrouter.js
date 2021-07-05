const {Router} = require('express')
const multer = require('../middleware/multer-config')
const router = Router()
const postcontrol = require("../controllers/postcontrol")
const auth = require("../middleware/auth")



/**
 * @swagger
 * paths:
 *   /post/:
 *     get:
 *       summary: get all post
 *       responses:
 *         '200':
 *           description: array of the post
 *         '500':
 *           description: Server error   
 *     
 */
router.get("/", postcontrol.getAllPosts)

/**
 * @swagger
 * paths:
 *   /post/{id}:
 *     get:
 *       summary: get all post
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *             example : 1
 *           required: true
 *           description: Numeric ID of the post to get
 *       responses:
 *         '200':
 *           description: one post with details
 *         '400':
 *           description: BAD REQUEST   
 *     
 */
router.get("/:id",postcontrol.getOnePost)
router.post("/",auth, multer, postcontrol.createOnePost)
router.put("/:id",auth, multer, postcontrol.updateOnePost )
router.delete("/:id", auth, postcontrol.deleteOnePost)
module.exports = router