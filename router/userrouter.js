const {Router} = require('express')
const router = Router()
const usercontrol = require("../controllers/usercontrol")
const auth = require("../middleware/auth")

/**
 * @swagger
 * paths:
 *  /api/user:
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
router.get("/" , auth ,usercontrol.getUserDetails)

/**
 * @swagger
 * paths:
 *   /api/user/signin:
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
 *   /api/user/login:
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
 *   /api/user/refresh:
 *     post:
 *       summary: refresh token
 *       requestBody:
 *         required: true 
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 id :
 *                   type: integer 
 *                   example : 2
 *       responses:
 *         '200':
 *           description: token refreshed
 *         '401':
 *           description: Unauthorized   
 *     
 */
router.post("/refresh", usercontrol.refreshToken)
module.exports = router