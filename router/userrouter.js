const {Router} = require('express')
const router = Router()
const usercontrol = require("../controllers/usercontrol")
const auth = require("../middleware/auth")

/**
 * @swagger
 * paths:
 *  /user:
 *    get:
 *      summary: Get all users
 *      responses:
 *        "200":
 *          description: GET all users from API
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserResponse'
 *
 */
router.get("/",usercontrol.getAllUser)

/**
 * @swagger
 * paths:
 *   /user/signin:
 *     post:
 *       summary: Signin one user
 *       requestBody:
 *         required: true 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRequest'
 *       responses:
 *         '201':
 *           description: Created
 *         '500':
 *           description: Server error   
 *     
 */
router.post("/signin" , usercontrol.signIn)
/**
 * @swagger
 * paths:
 *   /user/login:
 *     post:
 *       summary: Login one user
 *       requestBody:
 *         required: true 
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 email:
 *                   type: string
 *                   example : "AAAAAAAAAAAAAAA"
 *                 password:
 *                   type : string
 *                   example : "AAAAAAAAAAAAAAA"
 *       responses:
 *         '200':
 *           description: loged
 *         '500':
 *           description: Server error   
 *     
 */
router.post("/login", usercontrol.login)

/**
 * @swagger
 * paths:
 *   /user/refresh:
 *     post:
 *       summary: refresh token
 *       responses:
 *         '200':
 *           description: token refressehd
 *         '401':
 *           description: Unauthorized   
 *     
 */
router.post("/refresh", auth ,  usercontrol.refreshToken)
module.exports = router