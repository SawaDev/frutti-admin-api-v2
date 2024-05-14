import { Request, Response } from "express"
import { body, validationResult } from "express-validator"
import { User, UserPassword } from "models/User"

export default {
    // User validation
    UserRegistrationValidate: [
        body("user_name", "username is required").not().isEmpty(),
        body("password", "password is required").not().isEmpty(),
        body('password', 'The minimum password length is 6 characters').isLength({ min: 6 }),
    ],
    /**
     * Creation of user
     * @param req
     * @param res
     * @constructor
     */
    Create: async (req: Request, res: Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })

        const data = req.body

        const refUser = await UserPassword.query().insertAndFetch(data)

        const user = await User.query().select("id", "created_at", "user_name", "permissions").findById(refUser.id)
        return res.send({ success: true, data: user })
    },
    /**
     * update user
     * @param req
     * @param res
     * @constructor
     */
    Update: async (req: Request, res: Response) => {
        const { id } = req.params
        const data = req.body

        // Change password
        if (data.password)
            await UserPassword.query().updateAndFetchById(id, { password: data.password })

        await User.query().updateAndFetchById(id, {
            user_name: data.user_name,
            permissions: data.permissions,
        })

        const user = await User.query().select("id", "created_at", "user_name", "permissions").findById(id)
        return res.send({ success: true, data: user })
    },
    /**
     * Get all users
     * @param req
     * @param res
     * @constructor
     */
    GetAll: async (req: Request, res: Response) => {
        const users = await User.query().select("id", "created_at", "user_name", "permissions")
        return res.send({ success: true, data: users })
    },
    /**
     * Get all users
     * @param req
     * @param res
     * @constructor
     */
    Get: async (req: Request, res: Response) => {
        const { id } = req.params

        const user = await User.query().select("id", "created_at", "user_name", "permissions").findById(id)
        return res.send({ success: true, data: user })
    },
    /**
     * Delete user by id
     * @param req
     * @param res
     * @constructor
     */
    Delete: async (req: Request, res: Response) => {
        const { id } = req.params
        await User.query().deleteById(id)
        return res.send({ success: true })
    },
}
