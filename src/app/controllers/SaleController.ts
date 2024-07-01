import { Currency } from "app/models/Currency"
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

export default {
  Create: async (req: Request, res: Response) => {
    const data = req.body
    const currency = await Currency.query().insertAndFetch(data)
    return res.send({ success: true, data: currency })
  },

  Update: async (req: Request, res: Response) => {
    const { id } = req.params
    const data = req.body

    try {
      const existingCurrency = await Currency.query().findById(id);

      if (!existingCurrency) {
        return res.status(StatusCodes.NOT_FOUND).send({ success: false, message: 'Valyuta topilmadi!' });
      }

      const currency = await Currency.query().updateAndFetchById(id, {
        name: data.name ?? existingCurrency.name,
        distribution: data.distribution ?? existingCurrency.distribution,
        symbol: data.symbol ?? existingCurrency.symbol
      })

      return res.send({ success: true, data: currency })
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Something went wrong!' });
    }
  },

  GetAll: async (req: Request, res: Response) => {
    const currencies = await Currency.query().select("id", "created_at", "name", "distribution", "symbol")
    return res.send({ success: true, data: currencies })
  },

  Get: async (req: Request, res: Response) => {
    const { id } = req.params

    const existingCurrency = await Currency.query().select("id", "created_at", "name", "distribution", "symbol").findById(id)

      if (!existingCurrency) {
        return res.status(StatusCodes.NOT_FOUND).send({ success: false, message: 'Valyuta topilmadi!' });
      }

    return res.send({ success: true, data: existingCurrency })
  },

  Delete: async (req: Request, res: Response) => {
    const { id } = req.params
    await Currency.query().deleteById(id)
    return res.send({ success: true, message: "Valyuta muvaffaqiyatli o'chirildi!" })
  },
}
