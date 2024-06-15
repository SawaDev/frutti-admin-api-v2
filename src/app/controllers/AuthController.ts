import { Request, Response } from "express"
import { UserPassword } from "models/User"
import { body, validationResult } from "express-validator"
import jwt from "jsonwebtoken"

export default {
    LoginValidation: [
        body("user_name", "user name is required").not().isEmpty(),
        body("password", "password is required").not().isEmpty()
    ],

    Login: async (req: Request, res: Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })

        const { user_name, password } = req.body
        // Search user by username
        const user = await UserPassword.query().findOne({ user_name })
        if (!user)
            return res.status(500).send({ message: "Wrong credentials." })

        // Check password
        const isMatch = await user.verifyPassword(password)
        if (!isMatch)
            return res.status(500).send({ message: "Wrong credentials." })
        
        const { password: hidePassword, ...other } = user

        const token = jwt.sign(
            {...other},
            process.env.JWT ?? "",
            {}
        )

        return res.send({ status: "success", data: {...other, token} })
    }
}
