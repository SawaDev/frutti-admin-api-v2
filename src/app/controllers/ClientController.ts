import { Client } from "app/models/Client"
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

export default {
  Create: async (req: Request, res: Response) => {
    const data = req.body
    const client = await Client.query().insertAndFetch(data)
    return res.send({ success: true, data: client })
  },

  Update: async (req: Request, res: Response) => {
    const { id } = req.params
    const data = req.body

    const trx = await Client.startTransaction();
    try {
      const existingClient = await Client.query(trx).findById(id).forUpdate();

      if (!existingClient) {
        await trx.rollback();
        return res.status(StatusCodes.NOT_FOUND).send({ success: false, message: 'Haridor topilmadi!' });
      }

      await Client.query().updateAndFetchById(id, {
        name: data.name ?? existingClient.name,
        balance: data.balance ?? existingClient.balance
      })

      const client = await Client.query().select("id", "name", "balance", "created_at").findById(id)
      return res.send({ success: true, data: client })
    } catch (err) {
      res.status(StatusCodes.NOT_FOUND).send({ success: false, message: 'Haridor topilmadi!' });
    }
  },

  GetAll: async (req: Request, res: Response) => {
    const clients = await Client.query().select("id", "created_at", "name", "balance")
    return res.send({ success: true, data: clients })
  },

  Get: async (req: Request, res: Response) => {
    const { id } = req.params

    const existingClient = await Client.query().select("id", "created_at", "name", "balance").findById(id)

      if (!existingClient) {
        return res.status(StatusCodes.NOT_FOUND).send({ success: false, message: 'Haridor topilmadi!' });
      }

    return res.send({ success: true, data: existingClient })
  },

  Delete: async (req: Request, res: Response) => {
    const { id } = req.params
    await Client.query().deleteById(id)
    return res.send({ success: true, message: "Haridor muvaffaqiyatli o'chirildi!" })
  },
}
