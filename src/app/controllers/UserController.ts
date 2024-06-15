import { Request, Response } from "express"
import { User, UserPassword } from "models/User"
import { CreateUserType } from "types/User"

export default {
    Create: async (req: Request, res: Response) => {
        const data: CreateUserType = req.body

        const refUser = await UserPassword.query().insertAndFetch(data)

        const user = await User.query().select("id", "created_at", "user_name", "permissions").findById(refUser.id)
        return res.send({ success: true, data: user })
    },

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

    GetAll: async (req: Request, res: Response) => {
        const users = await User.query().select("id", "created_at", "user_name", "permissions")
        return res.send({ success: true, data: users })
    },

    Get: async (req: Request, res: Response) => {
        const { id } = req.params

        const user = await User.query().select("id", "created_at", "user_name", "permissions").findById(id)
        return res.send({ success: true, data: user })
    },

    Delete: async (req: Request, res: Response) => {
        const { id } = req.params
        await User.query().deleteById(id)
        return res.send({ success: true, message: "Foydalanuvchi muvaffaqiyatli o'chirildi!" })
    },
}
