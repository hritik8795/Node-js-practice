
const express =require("express");
const {getAllUsers} =require("../controllers/userController")
const router =express.Router()
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     description: Fetches all users from the database.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: john@example.com
 *       500:
 *         description: Internal Server Error
 */
router.get('/',getAllUsers)

module.exports=router;