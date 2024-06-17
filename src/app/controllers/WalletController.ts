import { Wallet } from "app/models/Wallet"
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

export default {
  Create: async (req: Request, res: Response) => {
    const data = req.body
    const wallet = await Wallet.query().insertAndFetch(data)
    return res.send({ success: true, data: wallet })
  },

  Update: async (req: Request, res: Response) => {
    const { id } = req.params
    const data = req.body

    try {
      const existingWallet = await Wallet.query().findById(id);

      if (!existingWallet) {
        return res.status(StatusCodes.NOT_FOUND).send({ success: false, message: 'Hamyon topilmadi!' });
      }

      const wallet = await Wallet.query().updateAndFetchById(id, {
        name: data.name ?? existingWallet.name,
        balance: data.balance ?? existingWallet.balance
      })

      return res.send({ success: true, data: wallet })
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Something went wrong!' });
    }
  },

  GetAll: async (req: Request, res: Response) => {
    const wallets = await Wallet.query().select("id", "created_at", "name", "balance")
    return res.send({ success: true, data: wallets })
  },

  Get: async (req: Request, res: Response) => {
    const { id } = req.params

    const existingWallet = await Wallet.query().select("id", "created_at", "name", "balance").findById(id)

      if (!existingWallet) {
        return res.status(StatusCodes.NOT_FOUND).send({ success: false, message: 'Hamyon topilmadi!' });
      }

    return res.send({ success: true, data: existingWallet })
  },

  Delete: async (req: Request, res: Response) => {
    const { id } = req.params
    await Wallet.query().deleteById(id)
    return res.send({ success: true, message: "Hamyon muvaffaqiyatli o'chirildi!" })
  },
}
